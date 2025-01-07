import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BeautifulMentionsPlugin } from 'lexical-beautiful-mentions';
import { CustomMenu, CustomMenuItem } from './common';
import { getEditorConfig } from './utils';

const items = [
  {
    id: 1,
    value: 'shadcn1',
  },
  {
    id: 2,
    value: 'shadcn2',
  },
  {
    id: 3,
    value: 'shadcn3',
  },
];

export default function CommentEditor() {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="h-8 w-8 rounded-full"
        />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>

      <div className="relative flex-1">
        <LexicalComposer initialConfig={getEditorConfig()}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-placeholder="댓글을 입력하세요..."
                placeholder={
                  <div className="pointer-events-none absolute top-2 px-3 text-sm text-gray-500">
                    댓글을 입력하세요...
                  </div>
                }
                className="relative min-h-[30px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <OnChangePlugin onChange={() => {}} />
          <BeautifulMentionsPlugin
            triggers={['@']}
            menuComponent={CustomMenu}
            menuItemComponent={CustomMenuItem}
            onSearch={(
              trigger: string,
              queryString?: string | undefined | null
            ) => {
              console.log(trigger, queryString);

              return new Promise(resolve => {
                resolve(items);
              });
            }}
          />
        </LexicalComposer>
      </div>
    </div>
  );
}
