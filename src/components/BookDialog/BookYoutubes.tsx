'use client';

import { bookApi } from '@/apis/book/book';
import { YouTubeVideo } from '@/apis/common/types';
import YoutubeDialog from '@/components/YoutubeDialog';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon, LayoutGridIcon, PlayIcon } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Props {
  bookId: number;
}

function BookYoutubesContent({ bookId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [slidesToScroll, setSlidesToScroll] = useState(1);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: videos = [] } = useSuspenseQuery({
    queryKey: ['book-videos', bookId],
    queryFn: () => bookApi.getBookVideos(bookId, 5),
    select: data => data.data,
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateVisibleItems = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      const itemWidth = 280; // 비디오 카드 기본 너비
      const gap = 16; // gap-4
      const visibleItems = Math.floor(
        (containerWidth + gap) / (itemWidth + gap)
      );
      setShowControls(videos.length > visibleItems);
      setSlidesToScroll(visibleItems);
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);

    return () => {
      window.removeEventListener('resize', calculateVisibleItems);
    };
  }, [videos.length]);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">관련 영상</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {videos.length}
          </span>
        </div>
        {videos.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronDownIcon className="h-4 w-4" />
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((video: YouTubeVideo) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideoId(video.id)}
              />
            ))}
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              loop: true,
              align: 'start',
              dragFree: true,
              slidesToScroll,
              inViewThreshold: 0.5,
              containScroll: 'trimSnaps',
            }}
          >
            <CarouselContent className="-ml-2 gap-1 pb-1">
              {videos.slice(0, 6).map((video: YouTubeVideo) => (
                <CarouselItem
                  key={video.id}
                  className="basis-[280px] sm:basis-[320px]"
                >
                  <VideoCard
                    video={video}
                    onClick={() => setSelectedVideoId(video.id)}
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

      <YoutubeDialog
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </div>
  );
}

function VideoCard({
  video,
  onClick,
}: {
  video: YouTubeVideo;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-md bg-white shadow-sm transition-all hover:shadow-md"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-red-500/90 shadow-md transition-all duration-300 group-hover:translate-y-0">
            <PlayIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3
          className="line-clamp-2 text-sm font-medium text-gray-900"
          dangerouslySetInnerHTML={{ __html: video.title }}
        />
        <p className="mt-1 text-xs text-gray-500">{video.channelTitle}</p>
      </div>
    </div>
  );
}

function BookYoutubesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="basis-[280px] overflow-hidden rounded-md border border-gray-200 bg-white sm:basis-[320px]"
          >
            <Skeleton className="aspect-video w-full rounded-md" />
            <div className="p-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-1 h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookYoutubes(props: Props) {
  return (
    <Suspense fallback={<BookYoutubesSkeleton />}>
      <BookYoutubesContent {...props} />
    </Suspense>
  );
}
