'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
export default function RelativeBooks() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">작가의 다른 책</p>
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
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="mr-2 basis-[110px]">
                <BookItem />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-[-10px]" />
        </Carousel>
      </div>
    </div>
  );
}

function BookItem() {
  return (
    <div className="group relative h-[160px] w-[110px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200">
      <img
        src="https://picsum.photos/110/160"
        alt="book"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        width={110}
        height={160}
      />
    </div>
  );
}
