'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { useQuery } from '@tanstack/react-query';

interface Props {
  bookId: number;
}

export default function RelativeBooks({ bookId }: Props) {
  const { data: response } = useQuery({
    queryKey: ['relativeBooks', bookId],
    queryFn: () => bookApi.searchRelatedBooks(bookId, { page: 1, limit: 20 }),
  });

  const books = response?.data.data ?? [];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">이 책의 다른 번역서</p>
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
          {books.length >= 8 && <CarouselNext className="right-4" />}
        </Carousel>
      </div>
    </div>
  );
}

interface BookItemProps {
  book: Book;
}

function BookItem({ book }: BookItemProps) {
  return (
    <div className="group relative h-[160px] w-[110px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200">
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
