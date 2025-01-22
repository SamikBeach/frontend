'use client';

import { Author } from '@/apis/author/types';
import { PaginatedResponse } from '@/apis/common/types';
import { userApi } from '@/apis/user/user';
import { AuthorGridItem, AuthorListItem } from '@/components/AuthorItem';
import AuthorGridItemSkeleton from '@/components/AuthorItem/AuthorGridItemSkeleton';
import AuthorListItemSkeleton from '@/components/AuthorItem/AuthorListItemSkeleton';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  userId: number;
}

export default function AuthorList({ userId }: Props) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<{ author: Author }>>,
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
    <>
      <div className="block md:hidden">
        <InfiniteScroll
          dataLength={authors.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <AuthorListItemSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            {authors.map(author => (
              <AuthorListItem key={author.author.id} author={author.author} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <div className="hidden md:block">
        <InfiniteScroll
          dataLength={authors.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <AuthorGridItemSkeleton key={i} size="small" />
              ))}
            </div>
          }
        >
          <div className="flex flex-wrap gap-3">
            {authors.map(author => (
              <AuthorGridItem
                key={author.author.id}
                author={author.author}
                size="small"
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
