'use client';

import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export function useHydrateBookAtoms() {
  const { searchParams } = useQueryParams();
  const setSearchKeyword = useSetAtom(bookSearchKeywordAtom);
  const setSortMode = useSetAtom(bookSortModeAtom);
  const setViewMode = useSetAtom(bookViewModeAtom);
  const setAuthorId = useSetAtom(authorIdAtom);

  useEffect(() => {
    setSearchKeyword(searchParams.get('q') ?? '');
    setSortMode(
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular'
    );
    setViewMode((searchParams.get('view') as 'grid' | 'list') ?? 'grid');
    setAuthorId(searchParams.get('authorId') ?? undefined);
  }, [searchParams, setSearchKeyword, setSortMode, setViewMode, setAuthorId]);
}
