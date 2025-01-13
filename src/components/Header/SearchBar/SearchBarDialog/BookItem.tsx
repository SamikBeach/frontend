import { Book } from '@/apis/book/types';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  book: Book;
}

export default function BookItem({ book }: Props) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="flex items-start gap-3 rounded-md p-2 hover:bg-accent"
    >
      <img
        src={book.imageUrl ?? '/placeholder-book.png'}
        alt={book.title}
        className="h-[84px] w-[58px] rounded-[2px] object-cover shadow-sm"
      />
      <div className="flex flex-1 flex-col gap-1">
        <div>
          <h4 className="line-clamp-1 text-[15px] font-medium">{book.title}</h4>
          <p className="line-clamp-1 text-[13px] text-muted-foreground">
            {book.authorBooks.map(ab => ab.author.nameInKor).join(', ')}
          </p>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ThumbsUpIcon className="h-3.5 w-3.5" />
            {book.likeCount}
          </span>
          <span className="flex items-center gap-1">
            <MessageSquareIcon className="h-3.5 w-3.5" />
            {book.reviewCount}
          </span>
        </div>
      </div>
    </Link>
  );
}
