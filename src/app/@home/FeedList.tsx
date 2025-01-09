'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { Feed } from '@/components/Feed';
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

  console.log({ reviews });

  if (isLoading) {
    return (
      <div className="my-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="mb-4 h-[400px] animate-pulse rounded-lg bg-gray-200"
            />
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
