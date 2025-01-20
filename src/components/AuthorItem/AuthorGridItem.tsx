'use client';

import { Author } from '@/apis/author/types';
import { authorSearchKeywordAtom } from '@/atoms/author';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import Highlighter from 'react-highlight-words';

interface Props {
  author: Author;
  size?: 'medium' | 'small';
}

export default function AuthorGridItem({ author, size = 'medium' }: Props) {
  const { open } = useDialogQuery({ type: 'author' });
  const searchValue = useAtomValue(authorSearchKeywordAtom);
  const searchWords = searchValue ? [searchValue] : [];

  const handleClick = () => {
    open(author.id);
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
          'group relative cursor-pointer overflow-hidden rounded-full bg-gray-100',
          {
            'h-[280px]': size === 'medium',
            'h-[160px]': size === 'small',
          }
        )}
        onClick={handleClick}
      >
        <img
          src={author.imageUrl ?? undefined}
          alt={author.nameInKor}
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
            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.nameInKor}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </h3>
          <p
            className={cn('line-clamp-1 text-gray-500', {
              'text-sm': size === 'medium',
              'text-xs': size === 'small',
            })}
          >
            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.name}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
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
                {author.bookCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
