'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import BookGridItem from '@/components/BookItem/BookGridItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Props {
  bookId: number;
}

function RelativeBooksContent({ bookId }: Props) {
  const { data: books = [] } = useSuspenseQuery({
    queryKey: ['relative-books', bookId],
    queryFn: () => bookApi.getAllRelatedBooks(bookId),
    select: data => data.data,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateVisibleItems = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const itemWidth = 110; // basis-[110px]
      const gap = 16; // gap-4
      const visibleItems = Math.floor(
        (containerWidth + gap) / (itemWidth + gap)
      );
      setShowControls(books.length > visibleItems);
      setSlidesToScroll(visibleItems);
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);

    return () => {
      window.removeEventListener('resize', calculateVisibleItems);
    };
  }, [books.length]);

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <p className="text-base font-semibold">이 책의 다른 번역서</p>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {books.length}
        </span>
      </div>
      <div className="relative" ref={containerRef}>
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: 'start',
            dragFree: true,
            slidesToScroll,
          }}
        >
          <CarouselContent className="gap-4">
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
          {showControls && <CarouselNext className="-right-2" />}
        </Carousel>
      </div>
    </div>
  );
}

function RelativeBooksSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-base font-semibold">이 책의 다른 번역서</p>
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
