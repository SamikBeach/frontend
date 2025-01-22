'use client';

import { AuthorCombobox } from '@/app/books/Tabs/AuthorCombobox';
import { GenreButtons } from './GenreButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

export default function Tabs() {
  return (
    <div className="w-full bg-white">
      <div className="flex w-full items-center justify-between py-4 md:w-[calc(100vw-270px)]">
        <GenreButtons />
        <div className="flex gap-2">
          <SearchBar />
          <AuthorCombobox />
          <SortModeTabs />
          <div className="hidden md:block">
            <ViewModeTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
