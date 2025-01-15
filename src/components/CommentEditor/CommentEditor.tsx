'use client';

import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useQuery } from '@tanstack/react-query';
import { $getRoot, CLEAR_EDITOR_COMMAND } from 'lexical';
import { BeautifulMentionsPlugin } from 'lexical-beautiful-mentions';
import { SendIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { UserAvatar } from '../UserAvatar';
import { CustomMenu, CustomMenuItem } from './common';
import { getEditorConfig } from './utils';

interface Props {
  onSubmit?: (comment: string) => void;
}

function CommentEditor({ onSubmit }: Props) {
  const currentUser = useCurrentUser();
  const [editor] = useLexicalComposerContext();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const { data: users = [] } = useQuery({
    queryKey: ['users', searchValue],
    queryFn: () =>
      userApi.searchUsers({
        ...(searchValue && {
          search: searchValue,
          searchBy: ['nickname'],
        }),
        limit: 5,
        page: 1,
      }),
    select: response => response.data.data,
    enabled: searchValue !== null,
  });

  const handleSubmit = useCallback(() => {
    if (!onSubmit) return;

    editor.getEditorState().read(() => {
      const root = $getRoot();
      const text = root.getTextContent();

      if (text.trim().length > 0) {
        onSubmit(JSON.stringify(editor.getEditorState()));
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
      }
    });
  }, [editor, onSubmit]);

  if (!currentUser) return null;

  return (
    <div className="flex items-start gap-3">
      <UserAvatar
        user={currentUser}
        size="sm"
        showNickname={false}
        className="mt-0.5"
      />

      <div className="relative flex-1">
        <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow focus-within:ring-1 focus-within:ring-blue-500">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="relative min-h-[40px] w-full resize-none rounded-lg px-4 py-2.5 pr-[76px] text-sm text-gray-900 outline-none" />
            }
            placeholder={
              <div className="pointer-events-none absolute left-4 top-2.5 text-sm text-gray-400">
                댓글을 입력하세요...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <div className="absolute bottom-1.5 right-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSubmit}
              className="h-7 rounded-md px-3 text-sm font-medium"
            >
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <HistoryPlugin />
        <BeautifulMentionsPlugin
          triggers={['@']}
          menuComponent={CustomMenu}
          menuItemComponent={CustomMenuItem}
          onSearch={(trigger: string, queryString?: string | null) => {
            setSearchValue(queryString ?? '');

            return Promise.resolve(
              users.map(user => ({
                id: user.id,
                value: user.nickname,
                nickname: user.nickname,
                email: user.email,
                imageUrl: user.imageUrl,
                type: 'user',
              }))
            );
          }}
        />
      </div>
    </div>
  );
}

export default function CommentEditorWithLexicalComposer({ onSubmit }: Props) {
  return (
    <LexicalComposer initialConfig={getEditorConfig()}>
      <CommentEditor onSubmit={onSubmit} />
    </LexicalComposer>
  );
}
