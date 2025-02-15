'use client';

import { THEME } from '@/constants/lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useEffect } from 'react';

interface Props {
  content: string;
  className?: string;
}

function Content({ content }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    try {
      const editorState = editor.parseEditorState(content);
      queueMicrotask(() => {
        editor.setEditorState(editorState);
      });
    } catch (error) {
      console.error('Failed to parse editor state:', error);
    }
  }, [editor, content]);

  return (
    <RichTextPlugin
      contentEditable={
        <ContentEditable
          className="text-[15px] outline-none [&_p]:m-0"
          readOnly
        />
      }
      placeholder={null}
      ErrorBoundary={LexicalErrorBoundary}
    />
  );
}

export default function FeedContent({ content, className }: Props) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'feed-content',
        theme: THEME,
        onError: (error: Error) => {
          console.error(error);
        },
        editorState: undefined,
        editable: false,
      }}
    >
      <div className={`inline ${className}`}>
        <Content content={content} />
      </div>
    </LexicalComposer>
  );
}
