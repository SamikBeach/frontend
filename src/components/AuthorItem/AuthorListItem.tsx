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
    <div className="flex gap-6">
      <div
        className="h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full"
        onClick={handleClick}
      >
        <img
          src={author.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={author.nameInKor}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between py-2">
        <div className="flex flex-col gap-0.5">
          <h3
            className="line-clamp-1 cursor-pointer text-base font-medium text-gray-900 hover:underline"
            onClick={handleClick}
          >
            {author.nameInKor}
          </h3>
          <p className="line-clamp-1 text-xs text-gray-500">{author.name}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-3.5 w-3.5" />
            <span>{author.likeCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon className="h-3.5 w-3.5" />
            <span>{author.reviewCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <LibraryIcon className="h-3.5 w-3.5" />
            <span>{author.reviewCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
