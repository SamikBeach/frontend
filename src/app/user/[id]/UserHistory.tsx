'use client';

import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { Review as ReviewType } from '@/apis/review/types';
import { userApi } from '@/apis/user/user';
import { AuthorGridItem } from '@/components/AuthorItem';
import { BookGridItem } from '@/components/BookItem';
import { Review } from '@/components/Review';
import {
  ReviewListSkeleton,
  ReviewSkeleton,
} from '@/components/Review/ReviewSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  userId: number;
}

export default function UserHistory({ userId }: Props) {
  const { searchParams, updateQueryParams } = useQueryParams();
  const currentTab = searchParams.get('tab') ?? 'review';

  const handleTabChange = (value: string) => {
    updateQueryParams({ tab: value });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="review">리뷰</TabsTrigger>
        <TabsTrigger value="like">좋아요</TabsTrigger>
      </TabsList>
      <TabsContent value="review" className="mt-2 flex flex-col gap-6">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ReviewList userId={userId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="like" className="mt-0 flex flex-col gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <BookList userId={userId} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthorList userId={userId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

interface ListProps {
  userId: number;
}

function ReviewList({ userId }: ListProps) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<ReviewType>>,
    Error
  >({
    queryKey: ['user-reviews', userId],
    queryFn: ({ pageParam = 1 }) =>
      userApi.getUserReviews(userId, {
        page: pageParam as number,
        limit: 20,
      }),
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

  if (reviews.length === 0) {
    return <div>아직 작성한 리뷰가 없습니다.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={reviews.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={<ReviewListSkeleton />}
    >
      <div className="flex flex-col gap-2">
        {reviews.map(review => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

function BookList({ userId }: ListProps) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Book>>,
    Error
  >({
    queryKey: ['user-liked-books', userId],
    queryFn: ({ pageParam = 1 }) =>
      userApi.getUserLikedBooks(userId, {
        page: pageParam as number,
        limit: 20,
      }),
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

  const books = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (books.length === 0) {
    return <div>아직 좋아요한 책이 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">책</p>
      <div className="flex flex-wrap gap-3">
        {books.map(book => (
          <BookGridItem key={book.id} book={book} size="small" />
        ))}
      </div>
    </div>
  );
}

function AuthorList({ userId }: ListProps) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Author>>,
    Error
  >({
    queryKey: ['user-liked-authors', userId],
    queryFn: ({ pageParam = 1 }) =>
      userApi.getUserLikedAuthors(userId, {
        page: pageParam as number,
        limit: 20,
      }),
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

  const authors = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (authors.length === 0) {
    return <div>아직 좋아요한 작가가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">작가</p>
      <div className="flex flex-wrap gap-3">
        {authors.map(author => (
          <AuthorGridItem key={author.id} author={author} size="small" />
        ))}
      </div>
    </div>
  );
}
