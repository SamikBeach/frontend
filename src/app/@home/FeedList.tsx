'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { Feed } from '@/components/Feed';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function FeedList() {
  const [tab, setTab] = useState<'popular' | 'recent'>('popular');

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
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
    placeholderData: keepPreviousData,
  });

  const reviews = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <div className="my-3">
        <div className="inline-flex gap-2 rounded-lg bg-gray-100 p-1">
          <Skeleton className="h-8 w-16 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>

        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="relative mb-11 flex max-w-[800px] rounded-lg p-4"
            >
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Skeleton className="h-[300px] w-[200px] rounded-lg" />
                    <div className="mt-2">
                      <Skeleton className="h-5 w-[200px]" />
                      <Skeleton className="mt-1 h-4 w-[200px]" />
                    </div>
                  </div>

                  <div className="flex h-full flex-1 flex-col justify-between">
                    <div>
                      <Skeleton className="mb-2 h-6 w-[300px]" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="mt-2 h-4 w-[90%]" />
                      <Skeleton className="mt-2 h-4 w-[95%]" />
                      <Skeleton className="mt-2 h-4 w-[85%]" />
                      <Skeleton className="mt-2 h-4 w-[92%]" />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Skeleton className="h-9 w-[72px] rounded-full" />
                      <Skeleton className="h-9 w-[72px] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-4 top-4">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
      </div>
    );
  }

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
          loader={
            <div className="flex h-20 items-center justify-center">
              Loading...
            </div>
          }
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
          loader={
            <div className="flex h-20 items-center justify-center">
              Loading...
            </div>
          }
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
