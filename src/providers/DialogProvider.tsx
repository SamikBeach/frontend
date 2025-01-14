'use client';

import { dialogAtom } from '@/atoms/dialog';
import { AuthorDialog } from '@/components/AuthorDialog';
import { BookDialog } from '@/components/BookDialog';
import ResetPasswordDialog from '@/components/ResetPasswordDialog/ResetPasswordDialog';
import { ReviewDialog } from '@/components/ReviewDialog';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [, setDialogState] = useAtom(dialogAtom);
  const { searchParams } = useQueryParams();

  useEffect(() => {
    const dialog = searchParams.get('dialog') as
      | 'book'
      | 'review'
      | 'author'
      | 'reset-password'
      | null;

    const urlId = searchParams.get('id');

    if (dialog) {
      if (dialog === 'reset-password') {
        setDialogState({ type: dialog, id: null });
      } else if (urlId) {
        setDialogState({ type: dialog, id: Number(urlId) });
      } else {
        setDialogState(null);
      }
    } else {
      setDialogState(null);
    }
  }, [searchParams, setDialogState]);

  return (
    <>
      {children}
      <BookDialog />
      <ReviewDialog />
      <AuthorDialog />
      <ResetPasswordDialog />
    </>
  );
}
