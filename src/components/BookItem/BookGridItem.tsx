'use client';

import { Book } from '@/apis/book/types';
import { BookDialog } from '@/components/BookDialog';
import { cn } from '@/lib/utils';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  book: Book;
  size?: 'small' | 'medium';
}

export default function BookGridItem({ book, size = 'medium' }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    setOpenDialog(true);
  };

  return (
    <div
      className={cn('flex flex-col gap-3', {
        'w-[280px]': size === 'medium',
        'w-[160px]': size === 'small',
      })}
    >
      <div
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100',
          {
            'h-[380px]': size === 'medium',
            'h-[220px]': size === 'small',
          }
        )}
        onClick={handleClick}
      >
        <img
          src={book.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <h3
            className={cn(
              'line-clamp-2 cursor-pointer font-semibold text-gray-900 hover:underline',
              {
                'text-lg': size === 'medium',
                'text-sm': size === 'small',
              }
            )}
            onClick={handleClick}
          >
            {book.title}
          </h3>
          <p
            className={cn('line-clamp-1 text-gray-600', {
              'text-base': size === 'medium',
              'text-xs': size === 'small',
            })}
          >
            {book.authorBooks
              .map(authorBook => authorBook.author.nameInKor)
              .join(', ')}
          </p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <div className="flex items-center gap-0.5">
              <ThumbsUpIcon
                className={cn('h-3 w-3', {
                  'h-3.5 w-3.5': size === 'medium',
                })}
              />
              <span
                className={cn('text-xs', {
                  'text-sm': size === 'medium',
                })}
              >
                {book.likeCount}
              </span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageSquareIcon
                className={cn('h-3 w-3', {
                  'h-3.5 w-3.5': size === 'medium',
                })}
              />
              <span
                className={cn('text-xs', {
                  'text-sm': size === 'medium',
                })}
              >
                {book.reviewCount}
              </span>
            </div>
          </div>
        </div>
      </div>
      <BookDialog
        bookId={book.id}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />
    </div>
  );
}
