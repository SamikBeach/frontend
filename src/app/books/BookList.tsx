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
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import BookListItemSkeleton from '@/components/BookItem/BookListItemSkeleton';
import { Empty } from '@/components/Empty';
import { GENRE_IDS } from '@/constants/genre';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { SearchXIcon } from 'lucide-react';
import { Suspense, useMemo } from 'react';
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
          searchBy: ['title'],
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
    <>
      <div className="block md:hidden">
        <BookListView {...viewProps} />
      </div>
      <div className="hidden md:block">
        {viewMode === 'list' ? (
          <BookListView {...viewProps} />
        ) : (
          <BookGridView {...viewProps} />
        )}
      </div>
    </>
  );
}

export default function BookList() {
  const viewMode = useAtomValue(bookViewModeAtom);

  return (
    <main className="h-full">
      <Suspense
        fallback={
          <>
            <div className="block md:hidden">
              <div className="flex flex-col">
                {[...Array(10)].map((_, i) => (
                  <BookListItemSkeleton key={i} />
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              {viewMode === 'list' ? (
                <div className="flex flex-col">
                  {[...Array(10)].map((_, i) => (
                    <BookListItemSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-7 py-6">
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
              )}
            </div>
          </>
        }
      >
        <BookListContent />
      </Suspense>
    </main>
  );
}
