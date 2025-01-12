'use client';

import { bookApi } from '@/apis/book/book';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props extends DialogProps {}

export default function BookDialog(props: Props) {
  const reviewListRef = useRef<HTMLDivElement>(null);
  const { isOpen, id: bookId, close } = useDialogQuery({ type: 'book' });

  const { data: book, isLoading } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => {
      if (!bookId) {
        throw new Error('Book ID is required');
      }

      return bookApi.getBookDetail(bookId);
    },
    select: data => data.data,
    enabled: isOpen,
  });

  if (!bookId) {
    return null;
  }

  return (
    <Dialog {...props} open={isOpen} onOpenChange={open => !open && close()}>
      <DialogContent
        overlayClassName="bg-black/10"
        className="fixed left-1/2 top-1/2 flex h-[94vh] w-[900px] min-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
        id="dialog-content"
      >
        {isLoading && <DialogTitle />}
        {book ? (
          <>
            <div className="flex flex-col gap-7">
              <BookInfo book={book} reviewListRef={reviewListRef} />
              <RelativeBooks bookId={bookId} />
              <ReviewList
                ref={reviewListRef}
                bookId={bookId}
                reviewCount={book.reviewCount}
                scrollableTarget="dialog-content"
              />
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
