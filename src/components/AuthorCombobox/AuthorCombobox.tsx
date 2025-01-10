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
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAtom } from 'jotai';
import { ChevronsUpDown, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import AuthorCommandEmpty from './AuthorCommandEmpty';
import AuthorCommandItem from './AuthorCommandItem';

export default function AuthorCombobox() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
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
    enabled: open,
  });

  const filteredAuthors = useMemo(() => {
    if (!search) return authors;
    return authors?.filter(author =>
      author.nameInKor.toLowerCase().includes(search.toLowerCase())
    );
  }, [authors, search]);

  const listRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: filteredAuthors?.length ?? 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => 32,
    overscan: 5,
  });

  const handleSelect = (currentValue: string) => {
    const newAuthor = authors?.find(
      author => author.id.toString() === currentValue
    );
    const isDeselecting = selectedAuthor?.id.toString() === currentValue;
    setSelectedAuthor(isDeselecting ? undefined : newAuthor);
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAuthor(undefined);
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
                {selectedAuthor ? (
                  <div
                    className="h-5 w-5 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                    onClick={handleClear}
                  >
                    <X className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100" />
                  </div>
                ) : (
                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                )}
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
        <Command>
          <CommandInput
            placeholder="작가 검색..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList className="max-h-[200px] overflow-y-auto" ref={listRef}>
            {filteredAuthors?.length === 0 ? (
              <AuthorCommandEmpty />
            ) : (
              <CommandGroup>
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const author = filteredAuthors?.[virtualRow.index];
                    if (!author) return null;

                    return (
                      <div
                        key={virtualRow.key}
                        data-index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >
                        <AuthorCommandItem
                          author={author}
                          isSelected={selectedAuthor?.id === author.id}
                          onSelect={handleSelect}
                        />
                      </div>
                    );
                  })}
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
