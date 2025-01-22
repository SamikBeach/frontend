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
import { $getRoot } from 'lexical';
import {
  BeautifulMentionsPlugin,
  useBeautifulMentions,
} from 'lexical-beautiful-mentions';
import { SendIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { LoginDialog } from '../LoginDialog';
import { UserAvatar } from '../UserAvatar';
import { CustomMenu, CustomMenuItem } from './common';
import { getCommentEditorConfig } from './utils';

interface Props {
  onSubmit?: (comment: string) => void;
  onCancel?: () => void;
  replyToUser?: {
    nickname: string;
  };
  initialContent?: string;
  showAvatar?: boolean;
  ref?: React.RefObject<HTMLDivElement | null>;
}

function CommentEditor({
  onSubmit,
  onCancel,
  replyToUser,
  initialContent,
  showAvatar = true,
  ref,
}: Props) {
  const currentUser = useCurrentUser();

  const [editor] = useLexicalComposerContext();
  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const { insertMention } = useBeautifulMentions();

  useEffect(() => {
    if (initialContent) {
      try {
        // 초기 내용이 있는 경우, 이를 파싱하여 에디터 상태로 설정
        const editorState = editor.parseEditorState(initialContent);

        queueMicrotask(() => {
          editor.setEditorState(editorState);
        });

        setTimeout(() => {
          editor.focus();
        }, 200);
      } catch (error) {
        console.error('Failed to parse initial content:', error);
      }
    } else if (replyToUser) {
      // replyToUser가 있는 경우, 에디터를 초기화하고 멘션을 삽입
      editor.update(() => {
        const root = $getRoot();
        root.clear();
      });

      queueMicrotask(() => {
        insertMention({ trigger: '@', value: replyToUser.nickname });
      });
    }
  }, [editor, replyToUser, initialContent, insertMention]);

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

    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    editor.getEditorState().read(() => {
      const root = $getRoot();
      const text = root.getTextContent();

      if (text.trim().length > 0) {
        onSubmit(JSON.stringify(editor.getEditorState()));

        editor.update(() => {
          const root = $getRoot();
          root.clear();
        });
      }
    });
  }, [editor, onSubmit, currentUser]);

  return (
    <>
      <div className="flex items-start gap-3">
        {showAvatar && (
          <UserAvatar
            user={
              currentUser ?? {
                nickname: 'Guest',
                id: 0,
                email: '',
                imageUrl: '',
              }
            }
            size="sm"
            showNickname={false}
            className="mt-0.5"
          />
        )}

        <div className={`relative ${showAvatar ? 'flex-1' : 'w-full'}`}>
          <div className="relative rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow focus-within:ring-1 focus-within:ring-blue-500">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  ref={ref}
                  className="relative min-h-[40px] w-full resize-none rounded-lg px-4 py-2.5 pr-[76px] text-sm text-gray-900 outline-none"
                  onKeyDownCapture={e => {
                    if (e.metaKey && e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSubmit();
                    } else if (e.key === 'Escape' && onCancel) {
                      e.preventDefault();
                      e.stopPropagation();
                      onCancel();
                    }
                  }}
                />
              }
              placeholder={
                <div className="pointer-events-none absolute left-4 top-2.5 text-sm text-gray-400">
                  댓글을 입력하세요...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <div className="absolute bottom-1.5 right-2 flex gap-1">
              {onCancel && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onCancel}
                  className="h-7 rounded-md px-3 text-sm font-medium"
                >
                  취소
                </Button>
              )}
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
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

export default function CommentEditorWithLexicalComposer({
  onSubmit,
  onCancel,
  replyToUser,
  initialContent,
  showAvatar,
  ref,
}: Props) {
  return (
    <LexicalComposer initialConfig={getCommentEditorConfig()}>
      <CommentEditor
        ref={ref}
        onSubmit={onSubmit}
        onCancel={onCancel}
        replyToUser={replyToUser}
        initialContent={initialContent}
        showAvatar={showAvatar}
      />
    </LexicalComposer>
  );
}
