import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { TextFormatButton } from './toolbar/TextFormatButton';

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
    </div>
  );
}
