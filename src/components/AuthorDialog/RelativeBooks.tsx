'use client';

import { authorApi } from '@/apis/author/author';
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
  authorId: number;
}

function RelativeBooksContent({ authorId }: Props) {
  const { data: books = [] } = useSuspenseQuery({
    queryKey: ['author-books', authorId],
    queryFn: () => authorApi.getAllAuthorBooks(authorId),
    select: response => response.data,
  });

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">작품</p>
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: 'start',
            slidesToScroll: 5,
          }}
        >
          <CarouselContent className="w-[400px] gap-2">
            {books.map((book: Book) => (
              <CarouselItem key={book.id} className="mr-2 basis-[110px]">
                <BookItem book={book} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {books.length >= 7 && <CarouselNext className="right-[-10px]" />}
        </Carousel>
      </div>
    </div>
  );
}

function RelativeBooksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-7 w-20" />
      <div className="relative">
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
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
  );
}
