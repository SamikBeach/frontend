'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { bookViewModeAtom } from '@/atoms/book';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import BookGridView from './BookGridView';
import BookListView from './BookListView';

export default function BookList() {
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

  const viewProps = {
    books,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
  };

  if (viewMode === 'list') {
    return <BookListView {...viewProps} />;
  }

  return <BookGridView {...viewProps} />;
}
