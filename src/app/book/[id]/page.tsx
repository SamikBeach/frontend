'use client';

import { useParams } from 'next/navigation';
import { useRef } from 'react';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

export default function BookPage() {
  const { id } = useParams();
  const reviewListRef = useRef<HTMLDivElement>(null);
  const bookId = Number(id);

  return (
    <div className="flex flex-col gap-10">
      <BookInfo bookId={bookId} reviewListRef={reviewListRef} />
      <RelativeBooks bookId={bookId} />
      <ReviewList
        ref={reviewListRef}
        bookId={bookId}
        scrollableTarget="dialog-content"
      />
    </div>
  );
}
