import { Genre } from '@/types/genre';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type BookViewMode = 'grid' | 'list';
export type BookSortMode = 'popular' | 'recent' | 'alphabet';

export const bookViewModeAtom = atomWithStorage<BookViewMode>(
  'bookViewMode',
  'grid'
);
export const bookSearchKeywordAtom = atom('');
export const bookSortModeAtom = atom<BookSortMode>('popular');
export const authorIdAtom = atom<string | undefined>(undefined);
export const bookGenreAtom = atom<Genre>('all');
export const includeOtherTranslationsAtom = atomWithStorage<boolean>(
  'includeOtherTranslations',
  false
);
