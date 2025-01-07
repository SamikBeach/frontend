import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from '../CustomMentionComponent';

export default function getEditorConfig(): InitialConfigType {
  return {
    namespace: 'comment-item',
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [...createBeautifulMentionNode(CustomMentionComponent)],
    theme: {
      beautifulMentions: {
        '@': '@:item',
        '@Focused': '@focused:item',
        '#': '#:item',
        '#Focused': '#focused:item',
      },
    },
    editorState: undefined,
  } as InitialConfigType;
}
