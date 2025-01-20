'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import BookImage from '@/components/BookImage/BookImage';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
  bookId: number;
}

function RelativeBooksContent({ bookId }: Props) {
  const { data: books = [] } = useSuspenseQuery({
    queryKey: ['relative-books', bookId],
    queryFn: () => bookApi.getAllRelatedBooks(bookId),
    select: data => data.data,
  });

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">이 책의 다른 번역서</p>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {books.length}
        </span>
      </div>
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: 'start',
            slidesToScroll: 8,
          }}
        >
          <CarouselContent className="w-[1080px] gap-4">
            {books.map((book: Book) => (
              <CarouselItem key={book.id} className="basis-[110px]">
                <BookItem book={book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {books.length >= 9 && <CarouselNext className="right-[-10px] z-10" />}
        </Carousel>
      </div>
    </div>
  );
}

function RelativeBooksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">이 책의 다른 번역서</p>
      <div className="relative">
        <div className="flex gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[160px] w-[110px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RelativeBooks(props: Props) {
  return (
    <Suspense fallback={<RelativeBooksSkeleton />}>
      <RelativeBooksContent {...props} />
    </Suspense>
  );
}

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  const { open } = useDialogQuery({ type: 'book' });

  return (
    <BookImage
      imageUrl={book.imageUrl}
      title={book.title}
      width={110}
      height={160}
      className="flex-shrink-0 cursor-pointer rounded-lg"
      onClick={() => open(book.id)}
    />
  );
}
