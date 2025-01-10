'use client';

import { Author } from '@/apis/author/types';
import { AuthorGridItem } from '@/components/AuthorItem';
import AuthorGridItemSkeleton from '@/components/AuthorItem/AuthorGridItemSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  authors: Author[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function AuthorGridView({
  authors,
  hasNextPage,
  fetchNextPage,
}: Props) {
  return (
    <InfiniteScroll
      dataLength={authors.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex animate-pulse gap-6 py-2">
          {[...Array(5)].map((_, i) => (
            <AuthorGridItemSkeleton key={i} size="small" />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-10 py-6">
        {authors.length > 0 && (
          <div className="flex min-w-max gap-6 overflow-auto pb-2">
            {authors.slice(0, 4).map(author => (
              <AuthorGridItem key={author.id} author={author} />
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-6 py-2">
          {authors.slice(4).map(author => (
            <AuthorGridItem key={author.id} author={author} size="small" />
          ))}
        </div>
      </div>
    </InfiniteScroll>
  );
}
