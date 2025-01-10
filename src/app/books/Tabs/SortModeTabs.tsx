import { BookSortMode, bookSortModeAtom } from '@/atoms/book';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAtom } from 'jotai';

interface SortModeTabsProps {
  onValueChange: (value: BookSortMode) => void;
}

export function SortModeTabs({ onValueChange }: SortModeTabsProps) {
  const [sortMode, setSortMode] = useAtom(bookSortModeAtom);

  const handleValueChange = (value: string) => {
    setSortMode(value as BookSortMode);
    onValueChange(value as BookSortMode);
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
