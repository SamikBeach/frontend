import { Genre } from '@/types/genre';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const authorGenreAtom = atom<Genre>('all');
export const authorSearchKeywordAtom = atom<string>('');
export const authorSortModeAtom = atom<'popular' | 'recent' | 'alphabet'>(
  'popular'
);
export const authorViewModeAtom = atomWithStorage<'grid' | 'list'>(
  'authorViewMode',
  'grid'
);
