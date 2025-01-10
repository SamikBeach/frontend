import { Author } from '@/apis/author/types';
import { atom } from 'jotai';

export type BookViewMode = 'grid' | 'list';
export type BookSortMode = 'popular' | 'recent' | 'alphabet';

export const bookViewModeAtom = atom<BookViewMode>('grid');
export const bookSearchKeywordAtom = atom<string>('');
export const bookSortModeAtom = atom<BookSortMode>('popular');
export const authorFilterAtom = atom<Author | undefined>(undefined);
