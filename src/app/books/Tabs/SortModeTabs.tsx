import { BookSortMode, bookSortModeAtom } from '@/atoms/book';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAtom } from 'jotai';

export function SortModeTabs() {
  const [sortMode, setSortMode] = useAtom(bookSortModeAtom);

  return (
    <Tabs
      value={sortMode}
      onValueChange={value => setSortMode(value as BookSortMode)}
    >
      <TabsList>
        <TabsTrigger value="popular">인기순</TabsTrigger>
        <TabsTrigger value="recent">최신순</TabsTrigger>
        <TabsTrigger value="alphabet">가나다순</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
