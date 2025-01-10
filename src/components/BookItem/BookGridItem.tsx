'use client';

import { Book } from '@/apis/book/types';
import { cn } from '@/lib/utils';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  book: Book;
  size?: 'small' | 'medium';
}

export default function BookGridItem({ book, size = 'medium' }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-2', {
        'w-[280px]': size === 'medium',
        'w-[160px]': size === 'small',
      })}
    >
      <div
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-lg',
          {
            'h-[380px]': size === 'medium',
            'h-[220px]': size === 'small',
          }
        )}
      >
        <img
          src={book.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col">
          <h3
            className={cn('line-clamp-2 font-medium text-gray-900', {
              'text-lg': size === 'medium',
              'text-sm': size === 'small',
            })}
          >
            {book.title}
          </h3>
          <p
            className={cn('line-clamp-1 text-gray-500', {
              'text-base': size === 'medium',
              'text-xs': size === 'small',
            })}
          >
            {book.authorBooks
              .map(authorBook => authorBook.author.nameInKor)
              .join(', ')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
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
  );
}
