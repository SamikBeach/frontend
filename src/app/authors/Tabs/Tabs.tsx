'use client';

import { GenreButtons } from './GenreButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

export default function Tabs() {
  return (
    <div className="w-full bg-white">
      <div className="flex w-full flex-col gap-2 py-2 md:w-[calc(100vw-270px)] md:flex-row md:items-center md:justify-between md:gap-4 md:py-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="overflow-x-auto">
            <GenreButtons />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 md:hidden">
              <SearchBar />
            </div>
            <SortModeTabs />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <div className="hidden md:block">
            <ViewModeTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
