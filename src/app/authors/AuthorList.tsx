'use client';

import { authorApi } from '@/apis/author/author';
import { Author } from '@/apis/author/types';
import { PaginatedResponse } from '@/apis/common/types';
import {
  authorGenreAtom,
  authorSearchKeywordAtom,
  authorSortModeAtom,
  authorViewModeAtom,
  eraIdAtom,
} from '@/atoms/author';
import { Empty } from '@/components/Empty';
import {
  AuthorInfiniteLoaderSkeleton,
  AuthorListSkeleton,
} from '@/components/Skeleton/AuthorListSkeleton';
import { GENRE_IDS } from '@/constants/genre';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { SearchXIcon } from 'lucide-react';
import { Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import AuthorGridView from './AuthorGridView';
import AuthorListView from './AuthorListView';

function AuthorListContent() {
  const genre = useAtomValue(authorGenreAtom);
  const viewMode = useAtomValue(authorViewModeAtom);
  const searchKeyword = useAtomValue(authorSearchKeywordAtom);
  const sortMode = useAtomValue(authorSortModeAtom);
  const selectedEraId = useAtomValue(eraIdAtom);

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Author>>,
    Error
  >({
    queryKey: ['authors', searchKeyword, sortMode, genre, selectedEraId],
    queryFn: ({ pageParam = 1 }) => {
      const sortBy = (() => {
        switch (sortMode) {
          case 'popular':
            return 'likeCount:DESC';
          case 'recent':
            return 'createdAt:DESC';
          case 'alphabet':
            return 'nameInKor:ASC';
          default:
            return 'likeCount:DESC';
        }
      })();

      return authorApi.searchAuthors({
        page: pageParam as number,
        limit: 20,
        ...(searchKeyword && {
          search: searchKeyword,
          searchBy: ['name', 'nameInKor'],
        }),
        sortBy,
        filter: {
          genre_id: GENRE_IDS[genre] ?? undefined,
          eraId: selectedEraId ? Number(selectedEraId) : undefined,
        },
      });
    },
    initialPageParam: 1,
    getNextPageParam: (param: AxiosResponse<PaginatedResponse<Author>>) => {
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

  const authors = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (authors.length === 0 && (searchKeyword || selectedEraId)) {
    return (
      <Empty
        icon={<SearchXIcon className="h-12 w-12" />}
        title="검색 결과가 없어요."
        description={
          searchKeyword
            ? `'${searchKeyword}'로 검색한 결과가 없어요.`
            : '선택한 시대의 작가를 찾을 수 없어요.'
        }
      />
    );
  }

  const viewProps = {
    authors,
    hasNextPage: hasNextPage ?? false,
    fetchNextPage,
  };

  return (
    <InfiniteScroll
      dataLength={authors.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<AuthorInfiniteLoaderSkeleton viewMode={viewMode} />}
    >
      {viewMode === 'list' ? (
        <AuthorListView {...viewProps} className="hidden md:block" />
      ) : (
        <AuthorGridView {...viewProps} className="hidden md:block" />
      )}
      <AuthorListView {...viewProps} className="block md:hidden" />
    </InfiniteScroll>
  );
}

export default function AuthorList() {
  const viewMode = useAtomValue(authorViewModeAtom);

  return (
    <main className="h-full">
      <Suspense
        fallback={
          <>
            <div className="md:hidden">
              <AuthorListSkeleton viewMode="list" />
            </div>
            <div className="hidden md:block">
              <AuthorListSkeleton viewMode={viewMode} />
            </div>
          </>
        }
      >
        <AuthorListContent />
      </Suspense>
    </main>
  );
}
