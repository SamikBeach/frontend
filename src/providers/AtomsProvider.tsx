'use client';

import {
  authorSearchKeywordAtom,
  authorSortModeAtom,
  authorViewModeAtom,
} from '@/atoms/author';
import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function AtomsProvider({ children }: Props) {
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
    [authorSearchKeywordAtom, searchParams.get('q') ?? ''],
    [
      authorSortModeAtom,
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular',
    ],
    [
      authorViewModeAtom,
      (searchParams.get('view') as 'grid' | 'list') ?? 'grid',
    ],
  ]);

  return children;
}
