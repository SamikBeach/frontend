import { THEME } from '@/constants/lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import {
  $createParagraphNode,
  $getRoot,
  ParagraphNode,
  TextNode,
} from 'lexical';
import { useEffect, useRef } from 'react';
import { TooltipProvider } from '../ui/tooltip';
import { AutoFocusPlugin } from './plugins/AutoFocusPlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';

interface Props {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function ReviewEditor({
  content,
  onChange,
  placeholder,
}: Props) {
  const initialConfig = {
    namespace: 'ReviewEditor',
    theme: THEME,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [ParagraphNode, TextNode],
    editorState: () => {
      const root = $getRoot();
      if (root.getFirstChild() === null) {
        const paragraph = $createParagraphNode();
        root.append(paragraph);
      }
    },
  };

  return (
    <TooltipProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative flex min-h-[200px] w-full flex-col rounded-md border border-input bg-background text-sm ring-offset-background">
          <ToolbarPlugin />
          <RichTextPlugin
            contentEditable={
              <div className="relative flex-grow overflow-auto">
                <ContentEditable
                  className="min-h-[calc(100vh-20rem)] w-full resize-none px-3 py-2 outline-none"
                  placeholder={
                    <div className="pointer-events-none absolute left-3 top-2 select-none text-muted-foreground">
                      {placeholder}
                    </div>
                  }
                  aria-placeholder={placeholder ?? ''}
                />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <OnChangePlugin
          onChange={editorState => {
            editorState.read(() => {
              onChange(JSON.stringify(editorState));
            });
          }}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <InitialStatePlugin content={content} />
      </LexicalComposer>
    </TooltipProvider>
  );
}

function InitialStatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    if (!content) {
      return;
    }

    try {
      const editorState = editor.parseEditorState(content);
      editor.setEditorState(editorState);
    } catch (error) {
      console.error('Failed to parse initial content:', error);
    }
  }, [content, editor]);

  return null;
}
