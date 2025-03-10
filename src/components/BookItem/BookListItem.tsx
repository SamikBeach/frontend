'use client';

import { Book } from '@/apis/book/types';
import { bookSearchKeywordAtom } from '@/atoms/book';
import BookImage from '@/components/BookImage/BookImage';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { isMobileDevice } from '@/utils/responsive';
import { format } from 'date-fns';
import { useAtomValue } from 'jotai';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import Highlighter from 'react-highlight-words';

interface Props {
  book: Book;
}

export default function BookListItem({ book }: Props) {
  const { open } = useDialogQuery({ type: 'book' });
  const searchValue = useAtomValue(bookSearchKeywordAtom);
  const searchWords = searchValue ? [searchValue] : [];
  const router = useRouter();
  const { open: openAuthorDialog } = useDialogQuery({ type: 'author' });

  const handleClick = () => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/book/${book.id}`);
    } else {
      open(book.id);
    }
  };

  const handleAuthorClick = (authorId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (isMobileDevice()) {
      router.push(`/author/${authorId}`);
      return;
    }

    openAuthorDialog(authorId);
  };

  const formattedPublicationDate = book.publicationDate
    ? format(new Date(book.publicationDate), 'yyyy년 M월 d일')
    : '';

  return (
    <div className="relative rounded-xl bg-white p-3 transition-all hover:bg-gray-50/50">
      <div className="flex gap-5">
        <BookImage
          imageUrl={book.imageUrl}
          title={book.title}
          width={114}
          height={160}
          className="cursor-pointer rounded-lg"
          onClick={handleClick}
        />
        <div className="flex flex-1 flex-col justify-between py-0.5">
          <div className="flex flex-col gap-0.5">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={book.title}
              highlightClassName="text-blue-500 bg-transparent font-bold"
              className="cursor-pointer text-lg font-medium text-gray-900 hover:underline"
              onClick={handleClick}
            />

            <div className="text-sm font-medium text-gray-500">
              {book.authorBooks.map((authorBook, index) => (
                <Fragment key={authorBook.author.id}>
                  {index > 0 && ', '}
                  <span
                    onClick={e => handleAuthorClick(authorBook.author.id, e)}
                    className="cursor-pointer hover:underline"
                  >
                    <Highlighter
                      searchWords={searchWords}
                      textToHighlight={authorBook.author.nameInKor}
                      highlightClassName="text-blue-500 bg-transparent font-bold"
                    />
                  </span>
                </Fragment>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              {book.publisher} · {formattedPublicationDate}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <div className="flex items-center gap-0.5">
              <ThumbsUpIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{book.likeCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MessageSquareIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{book.reviewCount}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <LibraryIcon className="h-3.5 w-3.5" />
              <span className="text-sm">{book.totalTranslationCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
