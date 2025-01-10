import { Book } from '@/apis/book/types';
import { BookGridItem } from '@/components/BookItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  books: Book[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function BookGridView({
  books,
  hasNextPage,
  fetchNextPage,
}: Props) {
  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
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
          <div className="flex min-w-max gap-6 overflow-auto pb-2">
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
