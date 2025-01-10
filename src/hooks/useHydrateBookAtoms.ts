'use client';

import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useHydrateAtoms } from 'jotai/utils';

export function useHydrateBookAtoms() {
  const { searchParams } = useQueryParams();

  useHydrateAtoms([
    [bookSearchKeywordAtom, searchParams.get('q') ?? ''],
    [
      bookSortModeAtom,
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular',
    ],
    [bookViewModeAtom, (searchParams.get('view') as 'grid' | 'list') ?? 'grid'],
    [authorIdAtom, searchParams.get('authorId') ?? undefined],
  ]);
}
