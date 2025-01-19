'use client';

import { Book } from '@/apis/book/types';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { cn } from '@/lib/utils';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  book: Book;
  size?: 'medium' | 'small';
}

export default function BookGridItem({ book, size = 'medium' }: Props) {
  const { open } = useDialogQuery({ type: 'book' });

  const handleClick = () => {
    open(book.id);
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
            'h-[400px]': size === 'medium',
            'h-[230px]': size === 'small',
          }
        )}
        onClick={handleClick}
      >
        <img
          src={book.imageUrl ?? undefined}
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
            className={cn('line-clamp-1 text-gray-500', {
              'text-sm': size === 'medium',
              'text-xs': size === 'small',
            })}
          >
            {book.authorBooks
              ?.map(authorBook => authorBook.author.nameInKor)
              .join(', ') ?? '작가 미상'}
          </p>
          <div className="flex items-center gap-1.5 text-gray-500">
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
            <div className="flex items-center gap-0.5">
              <LibraryIcon
                className={cn('h-3 w-3', {
                  'h-3.5 w-3.5': size === 'medium',
                })}
              />
              <span
                className={cn('text-xs', {
                  'text-sm': size === 'medium',
                })}
              >
                {book.totalTranslationCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
