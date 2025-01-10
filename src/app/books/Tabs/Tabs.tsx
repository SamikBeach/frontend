'use client';

import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { AuthorCombobox } from '@/components/AuthorCombobox';
import { useHydrateAtoms } from 'jotai/utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CategoryButtons } from './CategoryButtons';
import { SearchBar } from './SearchBar';
import { SortModeTabs } from './SortModeTabs';
import { ViewModeTabs } from './ViewModeTabs';

function TabsContent() {
  return (
    <div className="sticky top-[56px] z-10 w-full bg-white">
      <div className="flex w-[calc(100vw-270px)] items-center justify-between py-4">
        <CategoryButtons />
        <div className="flex gap-2">
          <SearchBar />
          <AuthorCombobox />
          <SortModeTabs />
          <ViewModeTabs />
        </div>
      </div>
    </div>
  );
}

export default function Tabs() {
  const searchParams = useSearchParams();
  const isHydrated = useRef(false);

  // URL query parameter에서 초기값을 가져오는 함수
  useHydrateAtoms([
    [bookViewModeAtom, (searchParams.get('view') as any) ?? 'grid'],
    [bookSearchKeywordAtom, searchParams.get('q') ?? ''],
    [bookSortModeAtom, (searchParams.get('sort') as any) ?? 'popular'],
    [authorIdAtom, searchParams.get('authorId') ?? undefined],
  ]);

  // 한 번만 hydrate하도록 처리
  useEffect(() => {
    isHydrated.current = true;
  }, []);

  return <TabsContent />;
}
