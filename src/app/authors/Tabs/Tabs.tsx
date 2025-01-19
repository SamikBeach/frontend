'use client';

import { GenreButtons } from './GenreButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

export default function Tabs() {
  return (
    <div className="w-full bg-white">
      <div className="flex w-[calc(100vw-270px)] items-center justify-between py-4">
        <GenreButtons />
        <div className="flex gap-2">
          <SearchBar />
          <SortModeTabs />
          <ViewModeTabs />
        </div>
      </div>
    </div>
  );
}
