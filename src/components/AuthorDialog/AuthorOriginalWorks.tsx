'use client';

import { authorApi } from '@/apis/author/author';
import { OriginalWork } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpenIcon, ChevronDownIcon, LayoutGridIcon } from 'lucide-react';
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
          <h2 className="text-lg font-semibold">원전</h2>
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
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
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

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {displayWorks.map((work: OriginalWork) => (
          <OriginalWorkCard key={work.id} work={work} />
        ))}
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

  // 미분류 카드인 경우 다른 아이콘과 색상 사용
  const isUnclassified = work.id === -1;

  return (
    <div
      className={`group flex h-full flex-col rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all ${isUnclassified ? 'hover:border-orange-100 hover:bg-orange-50/30' : 'hover:border-blue-100 hover:bg-blue-50/30'} hover:shadow-md`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${isUnclassified ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700'}`}
        >
          {isUnclassified ? (
            <BookOpenIcon className="h-5 w-5" />
          ) : (
            <BookOpenIcon className="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm font-medium text-gray-900 ${isUnclassified ? 'group-hover:text-orange-900' : 'group-hover:text-blue-900'}`}
          >
            {work.title}
          </h3>
          {!isUnclassified && (work.titleInKor || work.titleInEng) && (
            <p className="text-xs text-gray-500 group-hover:text-blue-700/70">
              {work.titleInKor || work.titleInEng}
            </p>
          )}
          {!isUnclassified && publicationDate && (
            <p className="mt-1 text-xs text-gray-500">{publicationDate}</p>
          )}
          {isUnclassified && (
            <p className="text-xs text-gray-500">원전과 연결되지 않은 책들</p>
          )}
        </div>
      </div>

      {hasBooks && (
        <div className="mt-3 flex-1 border-t border-gray-100 pt-2">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-xs font-medium text-gray-700">
              {isUnclassified ? '책' : '연관된 책'} ({filteredBooks.length})
            </p>
            {hasMoreBooks && (
              <button
                onClick={() => setShowAllBooks(!showAllBooks)}
                className={`flex items-center gap-0.5 text-xs font-medium ${isUnclassified ? 'text-orange-600 hover:text-orange-800' : 'text-blue-600 hover:text-blue-800'}`}
              >
                {showAllBooks ? '접기' : '더보기'}
                <motion.div
                  animate={{ rotate: showAllBooks ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="h-3 w-3" />
                </motion.div>
              </button>
            )}
          </div>
          <motion.div
            className="flex flex-wrap gap-1"
            animate={{ height: 'auto' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                  className="flex w-full flex-wrap gap-1"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
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
      className={`flex items-center gap-2 rounded-md ${isUnclassified ? 'bg-orange-50 hover:bg-orange-100 hover:text-orange-700' : 'bg-gray-50 hover:bg-blue-50 hover:text-blue-700'} px-2.5 py-1.5 text-xs text-gray-700 transition-colors hover:shadow-sm`}
    >
      <img
        src={book.imageUrl || '/images/book-placeholder.png'}
        alt={book.title || '책 표지'}
        className="h-6 w-4 shrink-0 rounded object-cover"
      />
      <span className="text-left">{book.title || '제목 없음'}</span>
    </button>
  );
}

function AuthorOriginalWorksSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-5 w-8 rounded-full" />
        </div>
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col rounded-lg border border-gray-100 bg-white p-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
                <Skeleton className="mt-1 h-3 w-1/2" />
              </div>
            </div>
            <div className="mt-3 border-t border-gray-100 pt-2">
              <Skeleton className="mb-1 h-3 w-24" />
              <div className="flex flex-wrap gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-md" />
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
