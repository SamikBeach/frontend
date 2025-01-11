'use client';

import { BookDialog } from '@/components/BookDialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { id } = useDialogQuery({ type: 'book' });

  return (
    <>
      {children}
      {id && <BookDialog bookId={id} />}
    </>
  );
}
