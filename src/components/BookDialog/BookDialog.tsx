'use client';

import { bookApi } from '@/apis/book/book';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useQuery } from '@tanstack/react-query';
import { Suspense, useRef } from 'react';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props {
  bookId: number;
}

export default function BookDialog({ bookId }: Props) {
  const { isOpen, id: currentBookId, close } = useDialogQuery({ type: 'book' });

  const reviewListRef = useRef<HTMLDivElement>(null);

  const { data: book, isLoading } = useQuery({
    queryKey: ['book', currentBookId ?? bookId],
    queryFn: () => bookApi.getBookDetail(currentBookId ?? bookId),
    select: data => data.data,
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && close()}>
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
            <RelativeBooks bookId={currentBookId ?? bookId} />
            <Suspense>
              <ReviewList
                ref={reviewListRef}
                bookId={currentBookId ?? bookId}
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
