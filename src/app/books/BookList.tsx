'use client';

import { bookViewModeAtom } from '@/atoms/book';
import { BookItem } from '@/components/BookItem';
import BookListItem from '@/components/BookItem/BookListItem';
import { useAtomValue } from 'jotai';

export default function BookList() {
  const viewMode = useAtomValue(bookViewModeAtom);

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-6 pb-2">
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
      <div className="flex flex-wrap gap-3 py-2">
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
      </div>
    </>
  );
}
