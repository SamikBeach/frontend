import { Author } from '@/apis/author/types';
import { CommandItem } from '@/components/ui/command';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTextTruncated } from '@/hooks/useTextTruncated';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<typeof CommandItem> {
  author: Author;
  isSelected: boolean;
  onSelect: (value: string) => void;
}

export default function AuthorCommandItem({
  author,
  isSelected,
  onSelect,
  ...props
}: Props) {
  const { isTruncated, handleMouseEnter, handleMouseLeave } =
    useTextTruncated();

  return (
    <CommandItem
      value={author.nameInKor}
      onSelect={() => onSelect(author.id.toString())}
      className="cursor-pointer"
      {...props}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex max-w-[180px] items-center">
              <Check
                className={cn(
                  'mr-2 h-4 w-4 shrink-0',
                  isSelected ? 'opacity-100' : 'opacity-0'
                )}
              />
              <span
                className="truncate"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {author.nameInKor}
              </span>
            </div>
          </TooltipTrigger>
          {isTruncated && (
            <TooltipContent side="right">{author.nameInKor}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </CommandItem>
  );
}
