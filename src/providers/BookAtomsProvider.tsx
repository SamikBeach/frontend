'use client';

import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function HydrateAtoms({ children }: Props) {
  const { searchParams } = useQueryParams();

  useHydrateAtoms([
    [bookSearchKeywordAtom, searchParams.get('q') ?? ''],
    [
      bookSortModeAtom,
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular',
    ],
    [bookViewModeAtom, (searchParams.get('view') as 'grid' | 'list') ?? 'grid'],
    [authorIdAtom, searchParams.get('authorId') ?? null],
  ]);

  return children;
}

export function BookAtomsProvider({ children }: Props) {
  return (
    <Provider>
      <HydrateAtoms>{children}</HydrateAtoms>
    </Provider>
  );
}
