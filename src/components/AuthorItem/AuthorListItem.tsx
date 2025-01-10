'use client';

import { Author } from '@/apis/author/types';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  author: Author;
}

export default function AuthorListItem({ author }: Props) {
  return (
    <div className="flex gap-6">
      <div className="h-[120px] w-[120px] cursor-pointer overflow-hidden rounded-full">
        <img
          src={author.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={author.nameInKor}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-1 text-base font-medium text-gray-900">
            {author.nameInKor}
          </h3>
          <p className="line-clamp-1 text-xs text-gray-500">
            {author.nameInEng}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-gray-500">
            {author.description}
          </p>
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
        </div>
      </div>
    </div>
  );
}
