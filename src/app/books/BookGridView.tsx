import { Book } from '@/apis/book/types';
import { BookGridItem } from '@/components/BookItem';
import { cn } from '@/utils/common';

interface Props {
  books: Book[];
  className?: string;
}

export default function BookGridView({ books, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-10 py-6', className)}>
      {books.length > 0 && (
        <div className="flex min-w-max gap-6 overflow-auto pb-2">
          {books.slice(0, 4).map(book => (
            <BookGridItem key={book.id} book={book} showAuthor />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-6 py-2">
        {books.slice(4).map(book => (
          <BookGridItem key={book.id} book={book} size="small" showAuthor />
        ))}
      </div>
    </div>
  );
}
