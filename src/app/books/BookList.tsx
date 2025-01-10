'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { bookViewModeAtom } from '@/atoms/book';
import { BookGridItem, BookListItem } from '@/components/BookItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import BookListItemSkeleton from '@/components/BookItem/BookListItemSkeleton';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function BookListContent() {
  const viewMode = useAtomValue(bookViewModeAtom);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Book>>,
    Error
  >({
    queryKey: ['books'],
    queryFn: ({ pageParam = 1 }) => {
      return bookApi.searchBooks({
        page: pageParam as number,
        limit: 20,
      });
    },
    initialPageParam: 1,
    getNextPageParam: param => {
      // 다음 페이지가 없으면 undefined를 반환하여 hasNextPage가 false가 되도록 함
      if (!param.data.links.next) {
        return undefined;
      }

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

  if (viewMode === 'list') {
    return (
      <InfiniteScroll
        dataLength={books.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div className="flex flex-col gap-4 py-2">
            {[...Array(3)].map((_, i) => (
              <BookListItemSkeleton key={i} />
            ))}
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          {books.map(book => (
            <BookListItem key={book.id} book={book} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={
        <div className="flex animate-pulse gap-6 py-2">
          {[...Array(8)].map((_, i) => (
            <BookGridItemSkeleton key={i} size="small" />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-10 py-6">
        {books.length > 0 && (
          <div className="flex gap-6 pb-2">
            {books.slice(0, 4).map(book => (
              <BookGridItem key={book.id} book={book} />
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-6 py-2">
          {books.slice(4).map(book => (
            <BookGridItem key={book.id} book={book} size="small" />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}

export default function BookList() {
  const viewMode = useAtomValue(bookViewModeAtom);

  if (viewMode === 'list') {
    return (
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            {[...Array(10)].map((_, i) => (
              <BookListItemSkeleton key={i} />
            ))}
          </div>
        }
      >
        <BookListContent />
      </Suspense>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-10 py-6">
          <div className="flex gap-6">
            {[...Array(4)].map((_, i) => (
              <BookGridItemSkeleton key={i} />
            ))}
          </div>
          <div className="flex flex-wrap gap-6">
            {[...Array(8)].map((_, i) => (
              <BookGridItemSkeleton key={i} size="small" />
            ))}
          </div>
        </div>
      }
    >
      <BookListContent />
    </Suspense>
  );
}
