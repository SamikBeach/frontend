'use client';

import { bookApi } from '@/apis/book/book';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogProps, DialogTitle } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useRef, useState } from 'react';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props extends DialogProps {
  bookId: number;
}

export default function BookDialog({
  bookId: initialBookId,
  children,
  ...props
}: Props) {
  const [bookId, setBookId] = useState(initialBookId);
  const reviewListRef = useRef<HTMLDivElement>(null);

  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: data => data.data,
    enabled: props.open,
  });

  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="fixed left-1/2 top-1/2 flex h-[94vh] w-[900px] min-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
        id="dialog-content"
      >
        {isLoading && <DialogTitle />}
        {book && (
          <>
            <BookInfo book={book} reviewListRef={reviewListRef} />
            <RelativeBooks bookId={bookId} setBookId={setBookId} />
            <Suspense>
              <ReviewList
                ref={reviewListRef}
                bookId={bookId}
                reviewCount={book.reviewCount}
                scrollableTarget="dialog-content"
              />
            </Suspense>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
