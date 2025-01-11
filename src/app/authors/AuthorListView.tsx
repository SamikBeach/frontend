import { Author } from '@/apis/author/types';
import { AuthorListItem } from '@/components/AuthorItem';
import AuthorListItemSkeleton from '@/components/AuthorItem/AuthorListItemSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  authors: Author[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function AuthorListView({
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
        <div className="flex flex-col gap-4 py-2">
          {[...Array(3)].map((_, i) => (
            <AuthorListItemSkeleton key={i} />
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-4">
        {authors.map(author => (
          <AuthorListItem key={author.id} author={author} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
