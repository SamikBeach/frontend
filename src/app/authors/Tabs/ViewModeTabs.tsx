'use client';

import { authorViewModeAtom } from '@/atoms/author';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAtom } from 'jotai';
import { LayoutGridIcon, ListIcon } from 'lucide-react';

export function ViewModeTabs() {
  const [viewMode, setViewMode] = useAtom(authorViewModeAtom);

  return (
    <Tabs
      value={viewMode}
      onValueChange={value => setViewMode(value as 'grid' | 'list')}
    >
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
