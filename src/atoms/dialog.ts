import { atom } from 'jotai';

interface DialogState {
  type: 'book' | 'author' | 'review';
  id: number;
}

export const dialogAtom = atom<DialogState | null>(null);

// 편의를 위한 derived atoms
export const isDialogOpenAtom = atom(get => get(dialogAtom) !== null);
export const dialogTypeAtom = atom(get => get(dialogAtom)?.type ?? null);
export const dialogIdAtom = atom(get => get(dialogAtom)?.id ?? null);
