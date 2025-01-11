'use client';

import { BookDialog } from '@/components/BookDialog';
import { ReviewDialog } from '@/components/ReviewDialog';

export function DialogProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BookDialog />
      <ReviewDialog />
    </>
  );
}
