'use client';

import { authorApi } from '@/apis/author/author';
import { authorFilterAtom } from '@/atoms/book';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useTextTruncated } from '@/hooks/useTextTruncated';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import AuthorCommandEmpty from './AuthorCommandEmpty';
import AuthorCommandItem from './AuthorCommandItem';

export default function AuthorCombobox() {
  const [open, setOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useAtom(authorFilterAtom);
  const {
    isTruncated: isButtonTruncated,
    handleMouseEnter: onButtonMouseEnter,
    handleMouseLeave: onButtonMouseLeave,
  } = useTextTruncated();

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: authorApi.getAllAuthors,
    select: response => response.data,
  });

  const handleSelect = (currentValue: string) => {
    const newAuthor = authors?.find(
      author => author.id.toString() === currentValue
    );
    const isDeselecting = selectedAuthor?.id.toString() === currentValue;
    setSelectedAuthor(isDeselecting ? undefined : newAuthor);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                <span
                  className="truncate"
                  onMouseEnter={onButtonMouseEnter}
                  onMouseLeave={onButtonMouseLeave}
                >
                  {selectedAuthor?.nameInKor ?? '작가'}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {selectedAuthor && isButtonTruncated && (
            <TooltipContent>{selectedAuthor.nameInKor}</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      <PopoverContent
        className="w-[200px] p-0"
        onCloseAutoFocus={e => e.preventDefault()}
        align="end"
      >
        <Command className="max-h-[300px]">
          <CommandInput placeholder="작가 검색..." />
          <CommandList>
            <AuthorCommandEmpty />
            <CommandGroup>
              {authors?.map(author => (
                <AuthorCommandItem
                  key={author.id}
                  author={author}
                  isSelected={selectedAuthor?.id === author.id}
                  onSelect={handleSelect}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
