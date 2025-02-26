'use client';

import { authorApi } from '@/apis/author/author';
import { OriginalWork } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  defaultTransition,
  expandAnimation,
  itemAnimation,
  rotateAnimation,
} from '@/constants/animations';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, LayoutGridIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';

interface Props {
  authorId: number;
}

function AuthorOriginalWorksContent({ authorId }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: originalWorks = [] } = useSuspenseQuery({
    queryKey: ['author-original-works', authorId],
    queryFn: () => authorApi.getAuthorOriginalWorks(authorId),
    select: data => data.data,
  });

  const { data: authorBooks = [] } = useSuspenseQuery({
    queryKey: ['author-books', authorId],
    queryFn: () => authorApi.getAllAuthorBooks(authorId),
    select: data => data.data,
  });

  // 원전에 연결되지 않은 책들 찾기
  const classifiedBookIds = new Set<number>();
  originalWorks.forEach(work => {
    work.books?.forEach(book => {
      if (book && book.id) {
        classifiedBookIds.add(book.id);
      }
    });
  });

  const unclassifiedBooks = authorBooks.filter(
    book => !classifiedBookIds.has(book.id)
  );

  // 미분류 책이 없고 원전도 없으면 컴포넌트를 렌더링하지 않음
  if (originalWorks.length === 0 && unclassifiedBooks.length === 0) {
    return null;
  }

  // 미분류 책이 있으면 가상의 원전 카드를 추가
  const allWorks = [...originalWorks];
  if (unclassifiedBooks.length > 0) {
    allWorks.push({
      id: -1, // 가상의 ID
      title: '미분류',
      books: unclassifiedBooks,
      createdAt: '',
      updatedAt: null,
      deletedAt: null,
    });
  }

  const displayWorks = isExpanded ? allWorks : allWorks.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">원전</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {allWorks.length}
          </span>
        </div>
        {allWorks.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <motion.div
                  variants={rotateAnimation}
                  animate="expanded"
                  transition={defaultTransition}
                >
                  <ChevronDownIcon className="h-4 w-4" />
                </motion.div>
                접기
              </>
            ) : (
              <>
                <LayoutGridIcon className="h-4 w-4" />
                전체보기
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {allWorks.slice(0, 3).map((work: OriginalWork) => (
          <OriginalWorkCard key={work.id} work={work} />
        ))}

        <AnimatePresence>
          {isExpanded && allWorks.length > 3 && (
            <>
              {allWorks.slice(3).map((work: OriginalWork) => (
                <motion.div
                  key={work.id}
                  className="col-span-1"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={itemAnimation}
                  transition={defaultTransition}
                >
                  <OriginalWorkCard work={work} />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OriginalWorkCard({ work }: { work: OriginalWork }) {
  const [showAllBooks, setShowAllBooks] = useState(false);

  // 출판 날짜 포맷팅 함수
  const formatPublicationDate = () => {
    if (!work.publicationDate) return null;
    let dateText = work.publicationDate;
    // BC 표시
    if (work.publicationDateIsBc) {
      dateText = `BC ${dateText}`;
    }
    // 대략적인 연도 표시
    if (work.circa) {
      dateText = `c. ${dateText}`;
    }
    // 세기 표시
    if (work.century) {
      dateText = `${dateText}세기`;
    }
    // 복수형 표시 (영어권에서 사용)
    if (work.s) {
      dateText = `${dateText}s`;
    }
    // 사후 출판 표시
    if (work.posthumous) {
      dateText = `${dateText} (사후 출판)`;
    }
    return dateText;
  };

  const publicationDate = formatPublicationDate();
  const filteredBooks = work.books?.filter(book => book && book.id) || [];
  const hasBooks = filteredBooks.length > 0;
  const hasMoreBooks = filteredBooks.length > 3;
  const displayBooks = showAllBooks ? filteredBooks : filteredBooks.slice(0, 3);

  // 미분류 카드인 경우 다른 색상 사용
  const isUnclassified = work.id === -1;

  return (
    <div
      className={`flex h-full flex-col rounded-lg border ${
        isUnclassified
          ? 'border-orange-100 bg-orange-50/20'
          : 'border-gray-100 bg-white'
      } p-4 shadow-sm`}
    >
      <div className="flex flex-col">
        <h3
          className={`text-sm font-semibold ${
            isUnclassified ? 'text-orange-900' : 'text-gray-900'
          }`}
        >
          {work.title}
        </h3>
        {!isUnclassified && (
          <div className="mt-1 space-y-0.5">
            {work.titleInKor && work.titleInKor !== work.title && (
              <p className="text-xs text-gray-600">{work.titleInKor}</p>
            )}
            {work.titleInEng && work.titleInEng !== work.title && (
              <p className="text-xs italic text-gray-500">{work.titleInEng}</p>
            )}
          </div>
        )}
        {!isUnclassified && publicationDate && (
          <p className="mt-1.5 text-xs text-gray-500">{publicationDate}</p>
        )}
        {isUnclassified && (
          <p className="mt-1 text-xs text-gray-600">
            원전과 연결되지 않은 책들
          </p>
        )}
      </div>

      {hasBooks && (
        <div className="mt-4 flex-1 border-t border-gray-100 pt-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-700">
              {isUnclassified ? '책' : '연관된 책'} ({filteredBooks.length})
            </p>
            {hasMoreBooks && (
              <button
                onClick={() => setShowAllBooks(!showAllBooks)}
                className={`flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-medium ${
                  isUnclassified
                    ? 'text-orange-600 hover:bg-orange-100/50'
                    : 'text-blue-600 hover:bg-blue-100/50'
                } transition-colors`}
              >
                {showAllBooks ? '접기' : '더보기'}
                <motion.div
                  variants={rotateAnimation}
                  animate={showAllBooks ? 'expanded' : 'initial'}
                  transition={defaultTransition}
                >
                  <ChevronDownIcon className="h-3 w-3" />
                </motion.div>
              </button>
            )}
          </div>
          <motion.div
            className="flex flex-wrap gap-1.5"
            animate={{ height: 'auto' }}
            transition={defaultTransition}
          >
            {displayBooks.slice(0, 3).map(book => (
              <RelatedBookItem
                key={book.id}
                book={book}
                isUnclassified={isUnclassified}
              />
            ))}

            <AnimatePresence>
              {showAllBooks && filteredBooks.length > 3 && (
                <motion.div
                  className="flex w-full flex-wrap gap-1.5"
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  variants={expandAnimation}
                  transition={defaultTransition}
                >
                  {filteredBooks.slice(3).map(book => (
                    <RelatedBookItem
                      key={book.id}
                      book={book}
                      isUnclassified={isUnclassified}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function RelatedBookItem({
  book,
  isUnclassified = false,
}: {
  book: Book;
  isUnclassified?: boolean;
}) {
  const router = useRouter();
  const { open } = useDialogQuery({ type: 'book' });

  const handleClick = () => {
    if (!book || !book.id) return;

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/book/${book.id}`);
    } else {
      open(book.id);
    }
  };

  if (!book || !book.id) return null;

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md ${
        isUnclassified
          ? 'bg-orange-50 hover:bg-orange-100 hover:text-orange-700'
          : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700'
      } px-2.5 py-1.5 text-xs text-gray-700 transition-all hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-1`}
    >
      <img
        src={book.imageUrl || '/images/book-placeholder.png'}
        alt={book.title || '책 표지'}
        className="h-7 w-5 shrink-0 rounded-sm object-cover shadow-sm"
      />
      <span className="line-clamp-1 text-left">
        {book.title || '제목 없음'}
      </span>
    </button>
  );
}

function AuthorOriginalWorksSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-col">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-1 h-4 w-2/3" />
              <Skeleton className="mt-1.5 h-3 w-1/2" />
            </div>
            <div className="mt-4 border-t border-gray-100 pt-3">
              <div className="mb-2 flex items-center justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-9 w-28 rounded-md" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuthorOriginalWorks(props: Props) {
  return (
    <Suspense fallback={<AuthorOriginalWorksSkeleton />}>
      <AuthorOriginalWorksContent {...props} />
    </Suspense>
  );
}
