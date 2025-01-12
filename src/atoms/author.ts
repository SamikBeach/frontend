import { atom } from 'jotai';

export type AuthorCategory = 'all' | 'philosophy' | 'science' | 'economy';

export const authorCategoryAtom = atom<AuthorCategory>('all');
export const authorSearchKeywordAtom = atom<string>('');
export const authorSortModeAtom = atom<'popular' | 'recent' | 'alphabet'>(
  'popular'
);
export const authorViewModeAtom = atom<'grid' | 'list'>('grid');
