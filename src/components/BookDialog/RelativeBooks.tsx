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
  const { data: books = [] } = useQuery({
    queryKey: ['relativeBooks', bookId],
    queryFn: () => bookApi.getAllRelatedBooks(bookId),
    select: data => data.data,
  });

  if (books.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">이 책의 다른 번역서</p>
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
          {books.length >= 7 && <CarouselNext className="right-[-10px]" />}
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
