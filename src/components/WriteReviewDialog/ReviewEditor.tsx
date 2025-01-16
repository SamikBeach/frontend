import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { $getRoot, ParagraphNode, TextNode } from 'lexical';
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
  quote: 'border-l-4 border-gray-200 pl-4 italic',
  code: 'font-mono bg-muted p-4 rounded-md',
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
    nodes: [
      ParagraphNode,
      TextNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      AutoLinkNode,
      LinkNode,
      CodeNode,
      CodeHighlightNode,
    ],
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
                <ContentEditable className="min-h-[180px] outline-none" />
              }
              placeholder={
                <div className="pointer-events-none absolute left-[13px] top-[45px] select-none text-muted-foreground">
                  {placeholder}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <OnChangePlugin
            onChange={editorState => {
              editorState.read(() => {
                const root = $getRoot();
                onChange(JSON.stringify(editorState));
              });
            }}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </LexicalComposer>
    </TooltipProvider>
  );
}
