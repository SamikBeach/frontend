'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import BookImage from '@/components/BookImage/BookImage';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { Suspense } from 'react';

interface Props {
  bookId: number;
}

function BookInfoContent({ bookId }: Props) {
  const { data: book } = useSuspenseQuery<
    AxiosResponse<BookDetail>,
    Error,
    BookDetail
  >({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  const formattedPublicationDate = book.publicationDate
    ? format(new Date(book.publicationDate), 'yyyy년 M월 d일')
    : '';

  return (
    <div className="flex items-center gap-2">
      <div className="h-[40px] w-[28px]">
        <BookImage
          imageUrl={book.imageUrl}
          title={book.title}
          width={28}
          height={40}
          className="rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{book.title}</p>
        <p className="text-xs text-gray-500">
          {book.authorBooks
            .map(authorBook => authorBook.author.nameInKor)
            .join(', ')}{' '}
          · {book.publisher} · {formattedPublicationDate}
        </p>
      </div>
    </div>
  );
}

function BookInfoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-[40px] w-[28px] rounded-sm" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

export default function BookInfo(props: Props) {
  return (
    <Suspense fallback={<BookInfoSkeleton />}>
      <BookInfoContent {...props} />
    </Suspense>
  );
}
