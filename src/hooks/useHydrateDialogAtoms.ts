'use client';

import { dialogAtom } from '@/atoms/dialog';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useHydrateAtoms } from 'jotai/utils';

export function useHydrateDialogAtoms() {
  const { searchParams } = useQueryParams();
  const dialogType = searchParams.get('dialog') as
    | 'book'
    | 'author'
    | 'review'
    | null;
  const dialogId = searchParams.get('id');

  useHydrateAtoms([
    [
      dialogAtom,
      dialogType && dialogId
        ? { type: dialogType, id: Number(dialogId) }
        : null,
    ],
  ]);
}
