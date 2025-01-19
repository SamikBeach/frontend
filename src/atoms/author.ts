import { atom } from 'jotai';

export type AuthorGenre = 'all' | 'philosophy' | 'science' | 'economy';

export const authorGenreAtom = atom<AuthorGenre>('all');
export const authorSearchKeywordAtom = atom<string>('');
export const authorSortModeAtom = atom<'popular' | 'recent' | 'alphabet'>(
  'popular'
);
export const authorViewModeAtom = atom<'grid' | 'list'>('grid');
