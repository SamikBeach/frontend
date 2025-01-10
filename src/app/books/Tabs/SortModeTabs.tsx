'use client';

import { BookSortMode, bookSortModeAtom } from '@/atoms/book';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';

export function SortModeTabs() {
  const { updateQueryParams } = useQueryParams();
  const [sortMode, setSortMode] = useAtom(bookSortModeAtom);

  const handleValueChange = (value: string) => {
    setSortMode(value as BookSortMode);
    updateQueryParams({ sort: value });
  };

  return (
    <Tabs value={sortMode} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTrigger value="popular">인기순</TabsTrigger>
        <TabsTrigger value="recent">최신순</TabsTrigger>
        <TabsTrigger value="alphabet">가나다순</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
