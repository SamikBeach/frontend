'use client';

import { Book } from '@/apis/book/types';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  book: Book;
}

export default function BookListItem({ book }: Props) {
  return (
    <div className="flex gap-4">
      <div className="h-[120px] w-[86px] overflow-hidden rounded-lg">
        <img
          src={book.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={book.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-1 text-lg font-medium text-gray-900">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-sm text-gray-500">
            {book.authorBooks
              .map(authorBook => authorBook.author.nameInKor)
              .join(', ')}
          </p>
          <p className="line-clamp-2 text-sm text-gray-500">
            {book.description}
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>{book.likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon className="h-4 w-4" />
            <span>{book.reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
