'use client';

import { Author } from '@/apis/author/types';
import { authorSearchKeywordAtom } from '@/atoms/author';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatAuthorLifespan } from '@/utils/date';
import { useAtomValue } from 'jotai';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Highlighter from 'react-highlight-words';

interface Props {
  author: Author;
}

export default function AuthorListItem({ author }: Props) {
  const { open } = useDialogQuery({ type: 'author' });
  const searchValue = useAtomValue(authorSearchKeywordAtom);
  const searchWords = searchValue ? [searchValue] : [];
  const router = useRouter();

  const handleClick = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/author/${author.id}`);
    } else {
      open(author.id);
    }
  };

  const lifespan = formatAuthorLifespan(
    author.bornDate,
    author.bornDateIsBc,
    author.diedDate,
    author.diedDateIsBc
  );

  return (
    <div className="relative rounded-xl bg-white p-2">
      <div className="flex gap-5">
        <AuthorImage
          imageUrl={author.imageUrl}
          name={author.nameInKor}
          width={120}
          height={120}
          className="cursor-pointer rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200/50"
          onClick={handleClick}
        />
        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="flex flex-col">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.nameInKor}
              highlightClassName="text-blue-500 bg-transparent font-bold"
              onClick={handleClick}
              className="cursor-pointer text-lg font-semibold text-gray-900 hover:underline"
            />

            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.name}
              highlightClassName="text-blue-500 bg-transparent font-bold"
              className="text-sm text-gray-500"
            />

            {lifespan && <p className="text-sm text-gray-500">{lifespan}</p>}
          </div>
          <div className="mt-auto flex items-center gap-1.5 text-gray-500">
            <div className="flex items-center gap-0.5">
              <ThumbsUpIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{author.likeCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageSquareIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{author.reviewCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <LibraryIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{author.bookCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
