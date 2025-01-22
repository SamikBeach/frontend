import { Book } from '@/apis';
import BookImage from '@/components/BookImage/BookImage';
import Link from 'next/link';

interface Props {
  book: Book;
  className?: string;
}

export default function BookLink({ book, className = '' }: Props) {
  return (
    <Link
      href={`/book/${book.id}`}
      target="_blank"
      className={`flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 px-2 py-1 transition-colors hover:bg-gray-100 ${className}`}
    >
      <BookImage
        imageUrl={book.imageUrl}
        title={book.title}
        width={20}
        height={28}
        className="rounded-sm shadow-sm"
      />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-900">{book.title}</span>
        <span className="text-[11px] text-gray-500">
          {book.authorBooks
            .map(authorBook => authorBook.author.nameInKor)
            .join(', ')}
        </span>
      </div>
    </Link>
  );
}
