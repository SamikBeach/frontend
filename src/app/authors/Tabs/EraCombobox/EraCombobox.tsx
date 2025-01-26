'use client';

import { eraApi } from '@/apis/era';
import { eraIdAtom } from '@/atoms/author';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryParams } from '@/hooks/useQueryParams';
import { cn } from '@/utils/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { ChevronsUpDown, X } from 'lucide-react';
import { Suspense, useMemo, useState } from 'react';

function EraComboboxSkeleton() {
  return (
    <Button
      variant="outline"
      role="combobox"
      className="w-[160px] justify-between"
      disabled
    >
      <Skeleton className="h-4 w-16" />
      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );
}

function EraComboboxContent() {
  const { updateQueryParams } = useQueryParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedEraId, setSelectedEraId] = useAtom(eraIdAtom);

  const { data: eras } = useSuspenseQuery({
    queryKey: ['eras'],
    queryFn: eraApi.getAllEras,
    select: response => response.data,
  });

  const selectedEra = useMemo(
    () => eras?.find(era => era.id.toString() === selectedEraId),
    [eras, selectedEraId]
  );

  const filteredEras = useMemo(() => {
    if (!search) return eras;
    return eras?.filter(era =>
      era.eraInKor.toLowerCase().includes(search.toLowerCase())
    );
  }, [eras, search]);

  const handleSelect = (currentValue: string) => {
    const isDeselecting = selectedEraId === currentValue;
    const newEraId = isDeselecting ? undefined : currentValue;
    setSelectedEraId(newEraId);
    updateQueryParams({ eraId: newEraId });
    setOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEraId(undefined);
    updateQueryParams({ eraId: undefined });
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
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] justify-between"
        >
          <span className={cn('truncate', !selectedEra && 'text-gray-500')}>
            {selectedEra?.eraInKor ?? '시대'}
          </span>
          {selectedEra ? (
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
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput
            placeholder="시대 검색..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {filteredEras?.length === 0 ? (
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredEras?.map(era => (
                  <CommandItem
                    key={era.id}
                    value={era.id.toString()}
                    onSelect={handleSelect}
                    className="flex cursor-pointer items-center justify-between"
                  >
                    <span>{era.eraInKor}</span>
                    {selectedEraId === era.id.toString() && (
                      <span className="text-primary">✓</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function EraCombobox() {
  return (
    <Suspense fallback={<EraComboboxSkeleton />}>
      <EraComboboxContent />
    </Suspense>
  );
}
