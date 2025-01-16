import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from '../common/CustomMentionComponent';

interface Params {
  editable?: boolean;
}

export default function getCommentEditorConfig(params?: Params): InitialConfigType {
  return {
    namespace: 'comment-item',
    onError: (error: Error) => {
      console.log(error);
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
    editable: params?.editable ?? true,
  } as InitialConfigType;
}
