'use client';

import { BookDialog } from '@/components/BookDialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import BookList from './BookList';

export default function BooksPage() {
  const { id } = useDialogQuery({ type: 'book' });

  return (
    <>
      <BookList />
      {id && <BookDialog bookId={id} />}
    </>
  );
}
