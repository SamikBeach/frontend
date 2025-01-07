import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from '../common/CustomMentionComponent';

export default function getEditorConfig(): InitialConfigType {
  return {
    namespace: 'comment-item',
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [...createBeautifulMentionNode(CustomMentionComponent)],
    theme: {
      beautifulMentions: {
        '@': '@',
        '@Focused': '@focused',
        '#': '#',
        '#Focused': '#focused',
      },
    },
    editorState: undefined,
  } as InitialConfigType;
}
