'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { Feed } from '@/components/Feed';
import { FeedSkeleton } from '@/components/Feed/FeedSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Suspense, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function FeedListContent() {
  const [tab, setTab] = useState<'popular' | 'recent'>('popular');

  const { data, fetchNextPage } = useInfiniteQuery<
    AxiosResponse<PaginatedResponse<Review>>,
    Error
  >({
    queryKey: ['reviews', tab],
    queryFn: async ({ pageParam = 1 }) => {
      return await reviewApi.searchReviews({
        page: pageParam as number,
        limit: 10,
        sortBy: tab === 'popular' ? 'likeCount:desc' : 'createdAt:desc',
      });
    },
    initialPageParam: 1,
    getNextPageParam: param => {
      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find(q => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
  });

  const reviews = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  return (
    <Tabs
      value={tab}
      onValueChange={value => setTab(value as 'popular' | 'recent')}
      className="my-3"
    >
      <TabsList>
        <TabsTrigger value="popular">인기순</TabsTrigger>
        <TabsTrigger value="recent">최신순</TabsTrigger>
      </TabsList>
      <TabsContent value="popular">
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchNextPage}
          hasMore={true}
          loader={Array(3)
            .fill(0)
            .map((_, i) => (
              <FeedSkeleton key={i} />
            ))}
        >
          {reviews.map(review => (
            <Feed
              key={review.id}
              review={review}
              user={review.user}
              book={review.book}
            />
          ))}
        </InfiniteScroll>
      </TabsContent>
      <TabsContent value="recent">
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchNextPage}
          hasMore={true}
          loader={Array(3)
            .fill(0)
            .map((_, i) => (
              <FeedSkeleton key={i} />
            ))}
        >
          {reviews.map(review => (
            <Feed
              key={review.id}
              review={review}
              user={review.user}
              book={review.book}
            />
          ))}
        </InfiniteScroll>
      </TabsContent>
    </Tabs>
  );
}

export default function FeedList() {
  return (
    <Suspense
      fallback={
        <div className="my-3">
          <div className="inline-flex gap-2 rounded-lg bg-gray-100 p-1">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>

          {Array(3)
            .fill(0)
            .map((_, i) => (
              <FeedSkeleton key={i} />
            ))}
        </div>
      }
    >
      <FeedListContent />
    </Suspense>
  );
}
