'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
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
    queryKey: ['relativeBooks', bookId],
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
            slidesToScroll: 6,
          }}
        >
          <CarouselContent className="w-[840px] gap-4">
            {books.map((book: Book) => (
              <CarouselItem key={book.id} className="basis-[110px]">
                <BookItem book={book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {books.length >= 7 && <CarouselNext className="right-[-10px] z-10" />}
        </Carousel>
      </div>
    </div>
  );
}

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  const { open } = useDialogQuery({ type: 'book' });

  return (
    <>
      <div
        onClick={() => open(book.id)}
        className="group relative h-[160px] w-[110px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200"
      >
        <img
          src={book.imageUrl ?? 'https://picsum.photos/110/160'}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={110}
          height={160}
        />
      </div>
    </>
  );
}

function RelativeBooksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-7 w-32" />
      <div className="flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-[160px] w-[110px] flex-shrink-0 rounded-lg"
          />
        ))}
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
