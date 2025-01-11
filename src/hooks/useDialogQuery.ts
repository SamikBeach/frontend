'use client';

import { dialogAtom } from '@/atoms/dialog';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

type DialogType = 'book' | 'author' | 'review';

interface UseDialogQueryProps {
  type: DialogType;
}

export function useDialogQuery({ type }: UseDialogQueryProps) {
  const [dialog, setDialog] = useAtom(dialogAtom);
  const { updateQueryParams } = useQueryParams();

  const isOpen = dialog?.type === type;
  const id = dialog?.id;

  const open = useCallback(
    (id: number) => {
      setDialog({ type, id });
      updateQueryParams({ dialog: type, id: id.toString() });
    },
    [type, setDialog, updateQueryParams]
  );

  const close = useCallback(() => {
    setDialog(null);
    updateQueryParams({ dialog: undefined, id: undefined });
  }, [setDialog, updateQueryParams]);

  return {
    isOpen,
    id: id ?? null,
    open,
    close,
  };
}
