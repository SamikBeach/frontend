'use client';

import { authorSortModeAtom } from '@/atoms/author';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';

export function SortModeTabs() {
  const { updateQueryParams } = useQueryParams();
  const [sortMode, setSortMode] = useAtom(authorSortModeAtom);

  const handleValueChange = (value: string) => {
    setSortMode(value as 'popular' | 'recent' | 'alphabet');
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
