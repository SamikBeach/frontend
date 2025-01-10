import { atom } from 'jotai';

export type BookViewMode = 'grid' | 'list';
export type BookSortMode = 'popular' | 'recent' | 'alphabet';
export type BookCategory = 'all' | 'philosophy' | 'science' | 'economy';

export const bookViewModeAtom = atom<BookViewMode>('grid');
export const bookSearchKeywordAtom = atom<string>('');
export const bookSortModeAtom = atom<BookSortMode>('popular');
export const authorIdAtom = atom<string | undefined>(undefined);
export const bookCategoryAtom = atom<BookCategory>('all');
