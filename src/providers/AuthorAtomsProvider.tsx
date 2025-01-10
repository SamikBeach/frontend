'use client';

import {
  authorSearchKeywordAtom,
  authorSortModeAtom,
  authorViewModeAtom,
} from '@/atoms/author';
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

export function AuthorAtomsProvider({ children }: Props) {
  return (
    <Provider>
      <HydrateAtoms>{children}</HydrateAtoms>
    </Provider>
  );
}
