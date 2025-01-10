import { atom } from 'jotai';

export type BookViewMode = 'grid' | 'list';

export const bookViewModeAtom = atom<BookViewMode>('grid');
