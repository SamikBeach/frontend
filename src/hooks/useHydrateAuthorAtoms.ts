'use client';

import {
  authorSearchKeywordAtom,
  authorSortModeAtom,
  authorViewModeAtom,
} from '@/atoms/author';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useHydrateAtoms } from 'jotai/utils';

export function useHydrateAuthorAtoms() {
  const { searchParams } = useQueryParams();

  useHydrateAtoms([
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
}
