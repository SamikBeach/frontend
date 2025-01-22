'use client';

import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { userApi } from '@/apis/user/user';
import { BookGridItem, BookListItem } from '@/components/BookItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import BookListItemSkeleton from '@/components/BookItem/BookListItemSkeleton';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  userId: number;
}

export default function BookList({ userId }: Props) {
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
    <>
      <div className="block md:hidden">
        <InfiniteScroll
          dataLength={books.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <BookListItemSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            {books.map(book => (
              <BookListItem key={book.book.id} book={book.book} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="hidden md:block">
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
              <BookGridItem
                key={book.book.id}
                book={book.book}
                size="small"
                showAuthor
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
