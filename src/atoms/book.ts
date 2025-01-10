import { Author } from '@/apis/author/types';
import { atom } from 'jotai';

export const bookSearchKeywordAtom = atom('');
export const bookViewModeAtom = atom<'grid' | 'list'>('grid');
export const bookSortModeAtom = atom<'popular' | 'recent' | 'alphabet'>(
  'popular'
);
export const authorFilterAtom = atom<Author | undefined>(undefined);
