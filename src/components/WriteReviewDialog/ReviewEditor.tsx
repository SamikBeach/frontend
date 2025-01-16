import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ParagraphNode, TextNode } from 'lexical';
import { TooltipProvider } from '../ui/tooltip';
import { AutoFocusPlugin } from './plugins/AutoFocusPlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';

const theme = {
  paragraph: 'mb-1',
  heading: {
    h1: 'text-2xl font-bold',
    h2: 'text-xl font-bold',
    h3: 'text-lg font-bold',
  },
  list: {
    ul: 'list-disc list-inside',
    ol: 'list-decimal list-inside',
  },
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'font-mono bg-muted px-1.5 py-0.5 rounded-sm',
  },
  code: 'font-mono bg-muted p-4 rounded-md',
  link: 'text-blue-500 hover:underline',
};

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
    theme,
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [ParagraphNode, TextNode],
    editorState: content ? JSON.parse(content) : undefined,
  };

  return (
    <TooltipProvider>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative flex min-h-[200px] w-full flex-col rounded-md border border-input bg-background text-sm ring-offset-background">
          <ToolbarPlugin />
          <div className="px-3 py-2">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="min-h-[180px] outline-none"
                  placeholder={
                    <div className="pointer-events-none absolute left-3 top-12 select-none text-muted-foreground">
                      {placeholder}
                    </div>
                  }
                  aria-placeholder={placeholder ?? ''}
                />
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
        </div>
      </LexicalComposer>
    </TooltipProvider>
  );
}
