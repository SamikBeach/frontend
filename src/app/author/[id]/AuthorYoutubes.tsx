'use client';

import { authorApi } from '@/apis/author/author';
import { YouTubeVideo } from '@/apis/common/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

interface Props {
  authorId: number;
}

function AuthorYoutubesContent({ authorId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: videos = [] } = useSuspenseQuery({
    queryKey: ['author-videos', authorId],
    queryFn: () => authorApi.getAuthorVideos(authorId),
    select: data => data.data,
  });

  if (videos.length === 0) {
    return null;
  }

  const displayedVideos = isExpanded ? videos : videos.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">관련 영상</h2>
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
                <ChevronUpIcon className="h-4 w-4" />
                접기
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-4 w-4" />
                더보기
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {displayedVideos.map((video: YouTubeVideo) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white">
                  <PlayIcon className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h3 className="line-clamp-2 text-sm font-medium text-gray-900">
                {video.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{video.channelTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function AuthorYoutubesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 bg-white"
          >
            <Skeleton className="aspect-video w-full" />
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

export default function AuthorYoutubes(props: Props) {
  return (
    <Suspense fallback={<AuthorYoutubesSkeleton />}>
      <AuthorYoutubesContent {...props} />
    </Suspense>
  );
}
