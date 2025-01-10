import { Book } from '@/apis/book/types';
import { BookGridItem } from '@/components/BookItem';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import { Suspense } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  books: Book[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

function BookGridViewContent({ books, hasNextPage, fetchNextPage }: Props) {
  return (
    <InfiniteScroll
      dataLength={books.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="flex animate-pulse gap-6 py-2">
          {[...Array(4)].map((_, i) => (
            <BookGridItemSkeleton key={i} />
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

export default function BookGridView(props: Props) {
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
      <BookGridViewContent {...props} />
    </Suspense>
  );
}
