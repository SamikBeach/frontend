'use client';

import { Book } from '@/apis/book/types';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  book: Book;
}

export default function BookListItem({ book }: Props) {
  const { open } = useDialogQuery({ type: 'book' });

  const handleClick = () => {
    open(book.id);
  };

  return (
    <>
      <div className="flex gap-6">
        <div
          className="h-[160px] w-[114px] cursor-pointer overflow-hidden rounded-lg"
          onClick={handleClick}
        >
          <img
            src={book.imageUrl ?? 'https://picsum.photos/200/300'}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h3
              className="line-clamp-1 cursor-pointer text-base font-medium text-gray-900 hover:underline"
              onClick={handleClick}
            >
              {book.title}
            </h3>
            <p className="line-clamp-1 text-xs text-gray-500">
              {book.authorBooks
                .map(authorBook => authorBook.author.nameInKor)
                .join(', ')}
            </p>
            <p className="line-clamp-1 text-xs text-gray-400">
              {book.publisher}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
              {book.description}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="h-3.5 w-3.5" />
              <span>{book.likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareIcon className="h-3.5 w-3.5" />
              <span>{book.reviewCount}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
