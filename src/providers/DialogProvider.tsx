'use client';

import { dialogAtom } from '@/atoms/dialog';
import { BookDialog } from '@/components/BookDialog';
import { ReviewDialog } from '@/components/ReviewDialog';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [, setDialogState] = useAtom(dialogAtom);
  const { searchParams } = useQueryParams();

  useEffect(() => {
    const dialog = searchParams.get('dialog') as 'book' | 'review' | null;
    const urlId = searchParams.get('id');

    if (dialog && urlId) {
      setDialogState({ type: dialog, id: Number(urlId) });
    } else {
      setDialogState(null);
    }
  }, [searchParams, setDialogState]);

  return (
    <>
      {children}
      <BookDialog />
      <ReviewDialog />
    </>
  );
}
