'use client';

import { authorApi } from '@/apis/author/author';
import {
  authorFilterAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { AuthorCombobox } from '@/components/AuthorCombobox';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
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
  const [selectedAuthor, setSelectedAuthor] = useAtom(authorFilterAtom);

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: authorApi.getAllAuthors,
    select: response => response.data,
  });

  useEffect(() => {
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    const view = searchParams.get('view');
    const authorId = searchParams.get('authorId');

    if (q !== null && q !== searchKeyword) {
      setSearchKeyword(q);
    }
    if (sort !== null && sort !== sortMode) {
      setSortMode(sort as typeof sortMode);
    }
    if (view !== null && view !== viewMode) {
      setViewMode(view as typeof viewMode);
    }
    if (authorId !== (selectedAuthor?.id.toString() ?? null)) {
      const author = authors?.find(a => a.id.toString() === authorId);
      setSelectedAuthor(author);
    }
  }, [searchParams, authors]);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | undefined>) => {
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
          <AuthorCombobox
            onValueChange={value => updateQueryParams({ authorId: value })}
          />
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
