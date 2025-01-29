'use client';

import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { authorGenreAtom } from '@/atoms/author';
import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { Empty } from '@/components/Empty';
import {
  BookInfiniteLoaderSkeleton,
  BookListSkeleton,
} from '@/components/Skeleton/BookListSkeleton';
import { GENRE_IDS } from '@/constants/genre';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { SearchXIcon } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookGridView from './BookGridView';
import BookListView from './BookListView';

function BookListContent() {
  const genre = useAtomValue(authorGenreAtom);
  const viewMode = useAtomValue(bookViewModeAtom);
  const searchKeyword = useAtomValue(bookSearchKeywordAtom);
  const sortMode = useAtomValue(bookSortModeAtom);
  const selectedAuthorId = useAtomValue(authorIdAtom);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Book>>,
    Error
  >({
    queryKey: ['books', searchKeyword, sortMode, selectedAuthorId, genre],
    queryFn: ({ pageParam = 1 }) => {
      const sortBy = (() => {
        switch (sortMode) {
          case 'popular':
            return 'likeCount:DESC';
          case 'recent':
            return 'publicationDate:DESC';
          case 'alphabet':
            return 'title:ASC';
          default:
            return 'likeCount:DESC';
        }
      })();

      return bookApi.searchBooks({
        page: pageParam as number,
        limit: 20,
        ...(searchKeyword && {
          search: searchKeyword,
          searchBy: ['title', 'authorBooks.author.nameInKor'],
        }),
        sortBy,
        filter: {
          authorId: selectedAuthorId,
          genre_id: GENRE_IDS[genre] ?? undefined,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (param: AxiosResponse<PaginatedResponse<Book>>) => {
      if (!param.data.links.next) {
        return undefined;
      }

      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find((q: string) => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
  });

  const books = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (books.length === 0 && (searchKeyword || selectedAuthorId)) {
    return (
      <Empty
        icon={<SearchXIcon className="h-12 w-12" />}
        title="검색 결과가 없어요."
        description={
          searchKeyword
            ? `'${searchKeyword}'로 검색한 결과가 없어요.`
            : '선택한 작가의 도서를 찾을 수 없어요.'
        }
      />
    );
  }

  const viewProps = {
    books,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
  };

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<BookInfiniteLoaderSkeleton viewMode={viewMode} />}
    >
      {viewMode === 'list' ? (
        <BookListView {...viewProps} className="hidden md:block" />
      ) : (
        <BookGridView {...viewProps} className="hidden md:block" />
      )}
      <BookListView {...viewProps} className="block md:hidden" />
    </InfiniteScroll>
  );
}

export default function BookList() {
  const viewMode = useAtomValue(bookViewModeAtom);

  return (
    <main className="h-full">
      <Suspense
        fallback={
          <>
            <div className="md:hidden">
              <BookListSkeleton viewMode="list" />
            </div>
            <div className="hidden md:block">
              <BookListSkeleton viewMode={viewMode} />
            </div>
          </>
        }
      >
        <BookListContent />
      </Suspense>
    </main>
  );
}
