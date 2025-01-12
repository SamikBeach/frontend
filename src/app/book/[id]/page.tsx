'use client';

import { bookApi } from '@/apis/book/book';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

export default function BookPage() {
  const { id } = useParams();
  const reviewListRef = useRef<HTMLDivElement>(null);

  const { data: book } = useQuery({
    queryKey: ['book', Number(id)],
    queryFn: () => bookApi.getBookDetail(Number(id)),
    select: response => response.data,
  });

  if (!book) {
    return null;
  }

  return (
    <>
      <BookInfo book={book} reviewListRef={reviewListRef} />
      <RelativeBooks bookId={book.id} />
      <ReviewList
        ref={reviewListRef}
        bookId={book.id}
        reviewCount={book.reviewCount}
        scrollableTarget="dialog-content"
      />
    </>
  );
}
