'use client';

import { CategoryButtons } from './CategoryButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

export default function Tabs() {
  return (
    <div className="sticky top-[56px] z-10 flex items-center justify-between bg-white py-4">
      <CategoryButtons />
      <div className="flex w-[800px] gap-2">
        <SearchBar />
        <SortModeTabs />
        <ViewModeTabs />
      </div>
    </div>
  );
}
