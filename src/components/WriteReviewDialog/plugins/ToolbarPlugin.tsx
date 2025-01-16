import { $createListNode, $isListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createQuoteNode, $isQuoteNode } from '@lexical/rich-text';
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Divider } from './toolbar/Divider';
import { TextFormatButton } from './toolbar/TextFormatButton';
import { UtilityButton } from './toolbar/UtilityButton';

type TextFormat = 'bold' | 'italic' | 'underline' | 'strikethrough';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState<Set<TextFormat>>(
    new Set()
  );

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
          setActiveFormats(new Set());
          return false;
        }

        const formats = new Set<TextFormat>();
        if (selection.hasFormat('bold')) formats.add('bold');
        if (selection.hasFormat('italic')) formats.add('italic');
        if (selection.hasFormat('underline')) formats.add('underline');
        if (selection.hasFormat('strikethrough')) formats.add('strikethrough');

        setActiveFormats(formats);
        return false;
      },
      1
    );
  }, [editor]);

  const formatText = useCallback(
    (format: TextFormat) => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);

      // Immediately update the active formats
      setActiveFormats(prev => {
        const newFormats = new Set(prev);
        if (newFormats.has(format)) {
          newFormats.delete(format);
        } else {
          newFormats.add(format);
        }
        return newFormats;
      });
    },
    [editor]
  );

  const insertLink = useCallback(() => {
    if (!editor.isEditable()) return;

    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const url = prompt('URL을 입력하세요:');
      if (url) {
        selection.insertText(url);
      }
    }
  }, [editor]);

  const formatList = useCallback(
    (listType: 'number' | 'bullet') => {
      if (!editor.isEditable()) return;

      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes();
          nodes.forEach(node => {
            const parent = node.getParent();
            if ($isRootOrShadowRoot(parent)) {
              if ($isListNode(node)) {
                const paragraph = $createParagraphNode();
                node.replace(paragraph);
              } else {
                const list = $createListNode(listType);
                if (node.is($getRoot())) {
                  const paragraph = $createParagraphNode();
                  list.append(paragraph);
                } else {
                  node.replace(list);
                }
              }
            }
          });
        }
      });
    },
    [editor]
  );

  const formatQuote = useCallback(() => {
    if (!editor.isEditable()) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        nodes.forEach(node => {
          const parent = node.getParent();
          if ($isRootOrShadowRoot(parent)) {
            if ($isQuoteNode(node)) {
              const paragraph = $createParagraphNode();
              node.replace(paragraph);
            } else {
              const quote = $createQuoteNode();
              if (node.is($getRoot())) {
                const paragraph = $createParagraphNode();
                quote.append(paragraph);
              } else {
                node.replace(quote);
              }
            }
          }
        });
      }
    });
  }, [editor]);

  return (
    <div className="flex items-center gap-1 border-b p-1">
      <TextFormatButton
        tooltip="굵게 (⌘+B)"
        onClick={() => formatText('bold')}
        icon={BoldIcon}
        ariaLabel="Bold"
        isActive={activeFormats.has('bold')}
      />
      <TextFormatButton
        tooltip="기울임 (⌘+I)"
        onClick={() => formatText('italic')}
        icon={ItalicIcon}
        ariaLabel="Italic"
        isActive={activeFormats.has('italic')}
      />
      <TextFormatButton
        tooltip="밑줄 (⌘+U)"
        onClick={() => formatText('underline')}
        icon={UnderlineIcon}
        ariaLabel="Underline"
        isActive={activeFormats.has('underline')}
      />
      <TextFormatButton
        tooltip="취소선"
        onClick={() => formatText('strikethrough')}
        icon={StrikethroughIcon}
        ariaLabel="Strikethrough"
        isActive={activeFormats.has('strikethrough')}
      />

      <Divider />

      <UtilityButton
        tooltip="링크"
        onClick={insertLink}
        icon={LinkIcon}
        ariaLabel="Link"
      />
      <UtilityButton
        tooltip="글머리 기호 (*)"
        onClick={() => formatList('bullet')}
        icon={ListIcon}
        ariaLabel="Bullet List"
      />
      <UtilityButton
        tooltip="번호 매기기 (1.)"
        onClick={() => formatList('number')}
        icon={ListOrderedIcon}
        ariaLabel="Numbered List"
      />
      <UtilityButton
        tooltip="인용구 (>)"
        onClick={formatQuote}
        icon={QuoteIcon}
        ariaLabel="Quote"
      />
    </div>
  );
}
