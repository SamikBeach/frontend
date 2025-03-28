'use client';

import { authorApi } from '@/apis/author/author';
import { Book } from '@/apis/book/types';
import BookGridItem from '@/components/BookItem/BookGridItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import {
  defaultTransition,
  itemAnimation,
  rotateAnimation,
} from '@/constants/animations';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, LayoutGridIcon } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Props {
  authorId: number;
}

function RelativeBooksContent({ authorId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">
            {author.nameInKor.trim()}의 책
          </p>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {books.length}
          </span>
        </div>
        {books.length > 5 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <motion.div
                  variants={rotateAnimation}
                  animate="expanded"
                  transition={defaultTransition}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
                접기
              </>
            ) : (
              <>
                <LayoutGridIcon className="h-4 w-4" />
                전체보기
              </>
            )}
          </Button>
        )}
      </div>
      <div className="relative" ref={containerRef}>
        {isExpanded ? (
          <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 sm:gap-2 md:grid-cols-5 md:gap-4 lg:grid-cols-6">
            <AnimatePresence>
              {books.map((book: Book) => (
                <motion.div
                  key={book.id}
                  className="w-full"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={itemAnimation}
                  transition={defaultTransition}
                >
                  <BookGridItem
                    book={book}
                    size="xsmall"
                    showPublisher={true}
                    showPublicationDate={true}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              align: 'start',
              dragFree: true,
              slidesToScroll,
            }}
          >
            <CarouselContent className="-ml-2 gap-4">
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
            {showControls && (
              <CarouselNext className="right-[-10px] z-10 h-8 w-8 rounded-full border border-gray-100 bg-white text-gray-900 shadow-md hover:bg-gray-50" />
            )}
          </Carousel>
        )}
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
