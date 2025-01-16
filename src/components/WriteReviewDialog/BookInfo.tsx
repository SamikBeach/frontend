'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Skeleton } from '../ui/skeleton';

export function BookInfo({ bookId }: { bookId: number }) {
  const { data: book } = useSuspenseQuery<
    AxiosResponse<BookDetail>,
    Error,
    BookDetail
  >({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  return (
    <div className="flex items-center gap-2">
      <img
        src={book.imageUrl ?? 'https://picsum.photos/200/300'}
        className="h-[40px] rounded-sm"
        alt={book.title}
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{book.title}</p>
        <p className="text-xs text-gray-500">
          {book.authorBooks
            .map(
              (authorBook: { author: { nameInKor: string } }) =>
                authorBook.author.nameInKor
            )
            .join(', ')}{' '}
          · {book.publisher} · {book.publicationDate?.split('-')[0]}
        </p>
      </div>
    </div>
  );
}

export function BookInfoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-[40px] w-[40px] rounded-sm" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}
