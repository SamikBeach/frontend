import { Book } from '@/apis/book/types';
import { BookListItem } from '@/components/BookItem';
import BookListItemSkeleton from '@/components/BookItem/BookListItemSkeleton';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  books: Book[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

export default function BookListView({
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
