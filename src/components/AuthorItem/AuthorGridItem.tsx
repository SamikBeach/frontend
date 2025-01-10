'use client';

import { Author } from '@/apis/author/types';
import { cn } from '@/lib/utils';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  author: Author;
  size?: 'medium' | 'small';
}

export default function AuthorGridItem({ author, size = 'medium' }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-3', {
        'w-[280px]': size === 'medium',
        'w-[160px]': size === 'small',
      })}
    >
      <div
        className={cn(
          'group relative cursor-pointer overflow-hidden rounded-full bg-gray-100',
          {
            'h-[280px]': size === 'medium',
            'h-[160px]': size === 'small',
          }
        )}
      >
        <img
          src={author.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={author.nameInKor}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <h3
            className={cn('line-clamp-2 font-semibold text-gray-900', {
              'text-lg': size === 'medium',
              'text-sm': size === 'small',
            })}
          >
            {author.nameInKor}
          </h3>
          <p
            className={cn('line-clamp-1 text-gray-600', {
              'text-base': size === 'medium',
              'text-xs': size === 'small',
            })}
          >
            {author.nameInEng}
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
                {author.likeCount}
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
                {author.reviewCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
