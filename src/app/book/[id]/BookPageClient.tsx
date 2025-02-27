'use client';

import { useRef } from 'react';
import BookInfo from './BookInfo';
import BookYoutubes from './BookYoutubes';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props {
  bookId: number;
}

export default function BookPageClient({ bookId }: Props) {
  const reviewListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-10">
      <BookInfo bookId={bookId} reviewListRef={reviewListRef} />
      <RelativeBooks bookId={bookId} />
      <BookYoutubes bookId={bookId} />
      <ReviewList
        ref={reviewListRef}
        bookId={bookId}
        scrollableTarget="dialog-content"
      />
    </div>
  );
}
