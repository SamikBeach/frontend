'use client';

import { authorApi } from '@/apis/author/author';
import { authorIdAtom } from '@/atoms/book';
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
import { useQueryParams } from '@/hooks/useQueryParams';
import { useTextTruncated } from '@/hooks/useTextTruncated';
import { cn } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useAtom } from 'jotai';
import { ChevronsUpDown, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import AuthorCommandEmpty from './AuthorCommandEmpty';
import AuthorCommandItem from './AuthorCommandItem';

export default function AuthorCombobox() {
  const { updateQueryParams } = useQueryParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedAuthorId, setSelectedAuthorId] = useAtom(authorIdAtom);

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

  const selectedAuthor = useMemo(
    () => authors?.find(author => author.id.toString() === selectedAuthorId),
    [authors, selectedAuthorId]
  );

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
    const isDeselecting = selectedAuthorId === currentValue;
    const newAuthorId = isDeselecting ? undefined : currentValue;
    setSelectedAuthorId(newAuthorId);
    updateQueryParams({ authorId: newAuthorId });
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAuthorId(undefined);
    updateQueryParams({ authorId: undefined });
  };

  return (
    <Popover
      open={open}
      onOpenChange={isOpen => {
        if (!isOpen) {
          setSearch('');
        }
        setOpen(isOpen);
      }}
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[160px] justify-between"
              >
                <span
                  className={cn('truncate', !selectedAuthor && 'text-gray-500')}
                  onMouseEnter={onButtonMouseEnter}
                  onMouseLeave={onButtonMouseLeave}
                >
                  {selectedAuthor?.nameInKor ?? '작가'}
                </span>
                {selectedAuthor ? (
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
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
        onOpenAutoFocus={() => {
          rowVirtualizer.measure();
        }}
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
                          isSelected={selectedAuthorId === author.id.toString()}
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
