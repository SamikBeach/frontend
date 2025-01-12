'use client';

import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { userApi } from '@/apis/user/user';
import { BookGridItem } from '@/components/BookItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  userId: number;
}

export function BookList({ userId }: Props) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<{ book: Book }>>,
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
    <InfiniteScroll
      dataLength={books.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BookGridItemSkeleton key={i} size="small" />
          ))}
        </div>
      }
    >
      <div className="flex flex-wrap gap-3">
        {books.map(book => (
          <BookGridItem key={book.book.id} book={book.book} size="small" />
        ))}
      </div>
    </InfiniteScroll>
  );
}
