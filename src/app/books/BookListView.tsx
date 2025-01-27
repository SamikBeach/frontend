import { Book } from '@/apis/book/types';
import { BookListItem } from '@/components/BookItem';
import { cn } from '@/utils/common';

interface Props {
  books: Book[];
  className?: string;
}

export default function BookListView({ books, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-7 py-6', className)}>
      {books.map(book => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
}
