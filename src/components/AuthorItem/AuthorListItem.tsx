'use client';

import { Author } from '@/apis/author/types';
import { authorSearchKeywordAtom } from '@/atoms/author';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useAtomValue } from 'jotai';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import Highlighter from 'react-highlight-words';

interface Props {
  author: Author;
}

export default function AuthorListItem({ author }: Props) {
  const { open } = useDialogQuery({ type: 'author' });
  const searchValue = useAtomValue(authorSearchKeywordAtom);
  const searchWords = searchValue ? [searchValue] : [];

  const handleClick = () => {
    open(author.id);
  };

  return (
    <div className="group relative rounded-xl bg-white p-4 transition-all hover:bg-gray-50/50">
      <div className="flex gap-6">
        <AuthorImage
          imageUrl={author.imageUrl}
          name={author.nameInKor}
          width={120}
          height={120}
          className="cursor-pointer rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200/50"
          onClick={handleClick}
        />
        <div className="flex flex-1 flex-col justify-between py-2">
          <div className="flex flex-col gap-1">
            <h3
              className="cursor-pointer text-lg font-medium text-gray-900 decoration-gray-400 decoration-2 hover:underline"
              onClick={handleClick}
            >
              <Highlighter
                searchWords={searchWords}
                textToHighlight={author.nameInKor}
                highlightClassName="text-blue-500 bg-transparent font-bold"
              />
            </h3>
            <p className="text-sm text-gray-500">
              <Highlighter
                searchWords={searchWords}
                textToHighlight={author.name}
                highlightClassName="text-blue-500 bg-transparent font-bold"
              />
            </p>
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
