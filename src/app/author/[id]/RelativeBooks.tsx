'use client';

import { authorApi } from '@/apis/author/author';
import { Book } from '@/apis/book/types';
import BookGridItem from '@/components/BookItem/BookGridItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
  authorId: number;
}

function RelativeBooksContent({ authorId }: Props) {
  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

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
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">{author.nameInKor}의 책</p>
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
            dragFree: true,
          }}
        >
          <CarouselContent className="w-[1080px] gap-4">
            {books.map((book: Book) => (
              <CarouselItem key={book.id} className="basis-[110px]">
                <BookGridItem
                  book={book}
                  size="xsmall"
                  showPublisher={true}
                  showPublicationDate={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

function RelativeBooksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-7 w-24" />
      <div className="relative">
        <div className="flex gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <BookGridItemSkeleton key={index} size="xsmall" />
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
