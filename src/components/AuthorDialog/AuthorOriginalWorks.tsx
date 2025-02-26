'use client';

import { authorApi } from '@/apis/author/author';
import { OriginalWork } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useSuspenseQuery } from '@tanstack/react-query';
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

  if (originalWorks.length === 0) {
    return null;
  }

  const displayWorks = isExpanded ? originalWorks : originalWorks.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">원전</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {originalWorks.length}
          </span>
        </div>
        {originalWorks.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            {isExpanded ? (
              <>
                <ChevronDownIcon className="h-4 w-4" />
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
  const hasBooks =
    work.books && work.books.filter(book => book && book.id).length > 0;

  return (
    <div className="group flex flex-col rounded-lg border border-gray-100 bg-white p-3 shadow-sm transition-all hover:border-blue-100 hover:bg-blue-50/30 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
          <BookOpenIcon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-gray-900 group-hover:text-blue-900">
            {work.title}
          </h3>
          {(work.titleInKor || work.titleInEng) && (
            <p className="truncate text-xs text-gray-500 group-hover:text-blue-700/70">
              {work.titleInKor || work.titleInEng}
            </p>
          )}
          {publicationDate && (
            <p className="mt-1 text-xs text-gray-500">{publicationDate}</p>
          )}
        </div>
      </div>

      {hasBooks && (
        <div className="mt-3 border-t border-gray-100 pt-2">
          <p className="mb-1 text-xs font-medium text-gray-700">
            연관된 책 ({work.books?.length})
          </p>
          <div className="flex flex-wrap gap-1">
            {work.books
              ?.filter(book => book && book.id)
              .map(book => <RelatedBookItem key={book.id} book={book} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedBookItem({ book }: { book: Book }) {
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
      className="flex items-center gap-2 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
    >
      <img
        src={book.imageUrl || '/images/book-placeholder.png'}
        alt={book.title || '책 표지'}
        className="h-6 w-4 rounded object-cover"
      />
      <span className="max-w-[120px] truncate">
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
