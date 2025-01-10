'use client';

import { authorApi } from '@/apis/author/author';
import { Author } from '@/apis/author/types';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, SearchX } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSelect?: (author: Author | undefined) => void;
}

export default function AuthorCombobox({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: authorApi.getAllAuthors,
    select: response => response.data,
  });

  const selectedAuthor = authors?.find(
    author => author.id.toString() === value
  );

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
                <span className="truncate">
                  {value ? selectedAuthor?.nameInKor : '작가'}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          {selectedAuthor && (
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
            <CommandEmpty>
              <div className="flex flex-col items-center gap-2 py-6">
                <SearchX className="h-10 w-10 text-gray-400" />
                <div className="text-sm font-medium">검색 결과가 없어요.</div>
                <div className="text-xs text-muted-foreground">
                  다른 검색어로 다시 시도해보세요.
                </div>
              </div>
            </CommandEmpty>
            <CommandGroup>
              {authors?.map(author => (
                <TooltipProvider key={author.id}>
                  <Tooltip delayDuration={100}>
                    <CommandItem
                      value={author.id.toString()}
                      onSelect={currentValue => {
                        const newValue =
                          currentValue === value ? '' : currentValue;
                        setValue(newValue);
                        setOpen(false);
                        onSelect?.(
                          newValue
                            ? authors.find(a => a.id.toString() === newValue)
                            : undefined
                        );
                      }}
                      className="cursor-pointer"
                    >
                      <TooltipTrigger className="flex max-w-[180px] items-center">
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            value === author.id.toString()
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        <span className="truncate">{author.nameInKor}</span>
                      </TooltipTrigger>
                    </CommandItem>
                    <TooltipContent side="right">
                      {author.nameInKor}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
