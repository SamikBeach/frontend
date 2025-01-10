'use client';

import {
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { AuthorCombobox } from '@/components/AuthorCombobox';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { CategoryButtons } from './CategoryButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

export default function Tabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);
  const [sortMode, setSortMode] = useAtom(bookSortModeAtom);
  const [viewMode, setViewMode] = useAtom(bookViewModeAtom);

  // Initialize atoms from URL query params
  if (searchParams.get('q') !== searchKeyword) {
    setSearchKeyword(searchParams.get('q') ?? '');
  }
  if (searchParams.get('sort') !== sortMode) {
    setSortMode((searchParams.get('sort') as typeof sortMode) ?? 'popular');
  }
  if (searchParams.get('view') !== viewMode) {
    setViewMode((searchParams.get('view') as typeof viewMode) ?? 'grid');
  }

  const updateQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${pathname}${query}`);
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="sticky top-[56px] z-10 w-full bg-white">
      <div className="flex w-[calc(100vw-270px)] items-center justify-between py-4">
        <CategoryButtons />
        <div className="flex gap-2">
          <SearchBar onSearch={value => updateQueryParams({ q: value })} />
          <AuthorCombobox />
          <SortModeTabs
            onValueChange={value => updateQueryParams({ sort: value })}
          />
          <ViewModeTabs
            onValueChange={value => updateQueryParams({ view: value })}
          />
        </div>
      </div>
    </div>
  );
}
