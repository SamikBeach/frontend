'use client';

import { Author } from '@/apis/author/types';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  author: Author;
}

export default function AuthorListItem({ author }: Props) {
  const { open } = useDialogQuery({ type: 'author' });

  const handleClick = () => {
    open(author.id);
  };

  return (
    <div className="group relative rounded-xl bg-white p-4 transition-all hover:bg-gray-50/50">
      <div className="flex gap-6">
        <div
          className="relative h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full shadow-sm ring-1 ring-gray-200/50"
          onClick={handleClick}
        >
          <div className="absolute inset-0 bg-gray-50" />
          <img
            src={author.imageUrl ?? undefined}
            alt={author.nameInKor}
            className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between py-2">
          <div className="flex flex-col gap-1">
            <h3
              className="cursor-pointer text-lg font-medium text-gray-900 decoration-gray-400 decoration-2 hover:underline"
              onClick={handleClick}
            >
              {author.nameInKor}
            </h3>
            <p className="text-sm text-gray-500">{author.name}</p>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <ThumbsUpIcon className="h-4 w-4" />
              <span>{author.likeCount}</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <MessageSquareIcon className="h-4 w-4" />
              <span>{author.reviewCount}</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <LibraryIcon className="h-4 w-4" />
              <span>{author.bookCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
