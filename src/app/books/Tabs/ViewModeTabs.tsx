import { BookViewMode, bookViewModeAtom } from '@/atoms/book';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAtom } from 'jotai';
import { LayoutGridIcon, ListIcon } from 'lucide-react';

interface ViewModeTabsProps {
  onValueChange: (value: BookViewMode) => void;
}

export function ViewModeTabs({ onValueChange }: ViewModeTabsProps) {
  const [viewMode, setViewMode] = useAtom(bookViewModeAtom);

  const handleValueChange = (value: string) => {
    setViewMode(value as BookViewMode);
    onValueChange(value as BookViewMode);
  };

  return (
    <Tabs value={viewMode} onValueChange={handleValueChange}>
      <TabsList>
        <TabsTrigger value="grid" className="px-2">
          <LayoutGridIcon className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger value="list" className="px-2">
          <ListIcon className="h-5 w-5" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
