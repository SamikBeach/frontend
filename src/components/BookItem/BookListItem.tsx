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
    <div className="group relative rounded-xl bg-white p-4 transition-all">
      <div className="flex gap-6">
        <div
          className="relative h-[160px] w-[114px] cursor-pointer overflow-hidden rounded-lg shadow-sm"
          onClick={handleClick}
        >
          <img
            src={book.imageUrl ?? undefined}
            alt={book.title}
            className="absolute h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <h3
                className="cursor-pointer text-lg font-medium text-gray-900 decoration-2 hover:underline"
                onClick={handleClick}
              >
                {book.title}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                {book.authorBooks
                  .map(authorBook => authorBook.author.nameInKor)
                  .join(', ')}
              </p>
              <p className="text-sm text-gray-500">{book.publisher}</p>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {book.description}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
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
    </div>
  );
}
