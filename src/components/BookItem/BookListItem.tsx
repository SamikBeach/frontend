'use client';

import { Book } from '@/apis/book/types';
import { bookSearchKeywordAtom } from '@/atoms/book';
import BookImage from '@/components/BookImage/BookImage';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useAtomValue } from 'jotai';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import Highlighter from 'react-highlight-words';

interface Props {
  book: Book;
}

export default function BookListItem({ book }: Props) {
  const { open } = useDialogQuery({ type: 'book' });
  const searchValue = useAtomValue(bookSearchKeywordAtom);
  const searchWords = searchValue ? [searchValue] : [];

  const handleClick = () => {
    open(book.id);
  };

  return (
    <div className="group relative rounded-xl bg-white p-4 transition-all hover:bg-gray-50/50">
      <div className="flex gap-6">
        <div
          className="relative h-[160px] w-[114px] cursor-pointer overflow-hidden rounded-lg shadow-sm ring-1 ring-gray-200/50"
          onClick={handleClick}
        >
          <div className="absolute inset-0 bg-gray-50" />
          <div className="absolute h-full w-full transition-transform duration-300 group-hover:scale-105">
            <BookImage
              imageUrl={book.imageUrl}
              title={book.title}
              width={114}
              height={160}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between py-1">
          <div className="flex flex-col gap-2">
            <div className="space-y-1">
              <h3
                className="cursor-pointer text-lg font-medium text-gray-900 decoration-gray-400 decoration-2 hover:underline"
                onClick={handleClick}
              >
                <Highlighter
                  searchWords={searchWords}
                  textToHighlight={book.title}
                />
              </h3>
              <p className="text-sm font-medium text-gray-600">
                {book.authorBooks
                  .map(authorBook => authorBook.author.nameInKor)
                  .join(', ')}
              </p>
              <p className="text-sm text-gray-500">{book.publisher}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <ThumbsUpIcon className="h-4 w-4" />
              <span>{book.likeCount}</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <MessageSquareIcon className="h-4 w-4" />
              <span>{book.reviewCount}</span>
            </div>
            <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
              <LibraryIcon className="h-4 w-4" />
              <span>{book.totalTranslationCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
