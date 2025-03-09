'use client';

import { bookApi } from '@/apis/book/book';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import BookImage from '@/components/BookImage/BookImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { LoginDialog } from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useBookQueryData } from '@/hooks/queries/useBookQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { cn } from '@/utils/common';
import { formatAuthorLifespan } from '@/utils/date';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { josa } from 'josa';
import { BookIcon, Edit3Icon, MessageCircleIcon } from 'lucide-react';
import { RefObject, Suspense, useEffect, useState } from 'react';
import BookChat from './BookChat';

interface Props {
  bookId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

// HTML 엔티티를 디코딩하는 함수
const decodeHtmlEntities = (text: string): string => {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
};

function BookInfoContent({ bookId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const { open: openAuthorDialog } = useDialogQuery({ type: 'author' });

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openWriteReviewDialog, setOpenWriteReviewDialog] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { updateBookLikeQueryData } = useBookQueryData();

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  // 책이 바뀌면 대화창 닫기
  useEffect(() => {
    setIsChatOpen(false);
  }, [bookId]);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
      updateBookLikeQueryData({ bookId: book.id, isOptimistic: true });
    },
    onError: () => {
      updateBookLikeQueryData({
        bookId: book.id,
        isOptimistic: false,
        currentStatus: {
          isLiked: book.isLiked,
          likeCount: book.likeCount,
        },
      });
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    toggleLike();
  };

  const handleWriteReviewClick = () => {
    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    setOpenWriteReviewDialog(true);
  };

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);

    if (!isChatOpen) {
      setTimeout(() => {
        const textarea = document.querySelector('.chat-textarea');
        if (textarea instanceof HTMLTextAreaElement) {
          textarea.focus();
        }
      }, 300);
    }
  };

  const formattedPublicationDate = book.publicationDate
    ? format(new Date(book.publicationDate), 'yyyy년 M월 d일')
    : '';

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-white pt-4 sm:flex-row">
          <div className="flex flex-col items-center justify-center gap-4 sm:h-full sm:justify-start">
            <BookImage
              imageUrl={book.imageUrl}
              title={book.title}
              width={140}
              height={200}
              className="flex-shrink-0 cursor-pointer rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] md:h-[300px] md:w-[200px]"
              onClick={() =>
                window.open(
                  `https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${book.isbn}`,
                  '_blank'
                )
              }
            />
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <LikeButton
                  isLiked={book.isLiked ?? false}
                  likeCount={book.likeCount}
                  onClick={handleLikeClick}
                />
                <CommentButton
                  commentCount={book.reviewCount}
                  onClick={handleReviewClick}
                />
              </div>
              {/* 모바일에서는 숨김 처리 */}
              <Button
                onClick={toggleChat}
                variant="outline"
                size="sm"
                className={cn(
                  'hidden w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-sm transition-all sm:flex',
                  isChatOpen
                    ? 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                <MessageCircleIcon className="h-4 w-4" />
                {josa(
                  `${book.authorBooks[0]?.author.nameInKor || '작가'}#{과} 대화하기`
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleWriteReviewClick}
                className="hidden w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-sm transition-all sm:flex"
              >
                <Edit3Icon className="h-4 w-4" />
                리뷰 쓰기
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                    {book.title}
                  </DialogTitle>
                </div>

                {/* 작가 정보 섹션 */}
                <div className="flex flex-wrap gap-3">
                  {book.authorBooks.map(authorBook => (
                    <div
                      key={authorBook.author.id}
                      onClick={() => openAuthorDialog(authorBook.author.id)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-2.5 shadow-sm transition-colors hover:bg-gray-100"
                    >
                      <AuthorImage
                        imageUrl={authorBook.author.imageUrl}
                        name={authorBook.author.nameInKor}
                        width={40}
                        height={40}
                        className="rounded-full border border-gray-100"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {authorBook.author.nameInKor}
                        </span>
                        {(authorBook.author.bornDate ||
                          authorBook.author.diedDate) && (
                          <span className="text-xs text-gray-500">
                            {formatAuthorLifespan(
                              authorBook.author.bornDate,
                              authorBook.author.bornDateIsBc,
                              authorBook.author.diedDate,
                              authorBook.author.diedDateIsBc
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span className="rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-700">
                      {book.publisher}
                      {book.publisher && formattedPublicationDate && (
                        <span className="mx-1 font-medium">·</span>
                      )}
                      {formattedPublicationDate}
                    </span>
                  </div>
                </div>
                {book.bookOriginalWorks[0] && (
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3.5 text-sm shadow-sm">
                    <BookIcon className="mt-1 h-4 w-4 flex-shrink-0 text-indigo-600" />
                    <div className="flex flex-col space-y-1">
                      <span className="font-semibold text-gray-900 md:text-base">
                        {book.bookOriginalWorks[0].originalWork.title}
                      </span>
                      {book.bookOriginalWorks[0].originalWork.title !==
                        book.title && (
                        <span className="text-sm text-gray-700">
                          {book.title}
                        </span>
                      )}
                      {book.bookOriginalWorks[0].originalWork.titleInEng && (
                        <span className="text-xs italic text-gray-500">
                          {book.bookOriginalWorks[0].originalWork.titleInEng}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="rounded-md border border-gray-200 bg-gray-50 p-2.5 shadow-sm">
                  <div className="flex flex-col">
                    <p className="whitespace-pre-wrap text-sm leading-normal text-gray-700 md:text-base">
                      {book.description
                        ? decodeHtmlEntities(book.description)
                        : ''}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      정보 제공: 알라딘
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 모바일에서만 표시되는 버튼들 */}
        <div className="flex flex-col gap-3 sm:hidden">
          <Button
            onClick={toggleChat}
            variant="outline"
            size="sm"
            className={cn(
              'w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-sm transition-all',
              isChatOpen
                ? 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <MessageCircleIcon className="h-4 w-4" />
            {josa(
              `${book.authorBooks[0]?.author.nameInKor || '작가'}#{과} 대화하기`
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleWriteReviewClick}
            className="w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-sm transition-all"
          >
            <Edit3Icon className="h-4 w-4" />
            리뷰 쓰기
          </Button>
        </div>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <BookChat bookId={bookId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <WriteReviewDialog
        bookId={book.id}
        open={openWriteReviewDialog}
        onOpenChange={setOpenWriteReviewDialog}
      />
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function BookInfoSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6 bg-white pt-4 sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-4 sm:h-full sm:justify-start">
          <Skeleton className="h-[200px] w-[140px] shrink-0 rounded-lg shadow-md md:h-[300px] md:w-[200px]" />
          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
            {/* 모바일에서는 숨김 처리 */}
            <Skeleton className="hidden h-9 w-full rounded-md shadow-sm sm:block" />
            <Skeleton className="hidden h-9 w-full rounded-md shadow-sm sm:block" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Skeleton className="h-8 w-48 md:h-10" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Skeleton className="h-6 w-32 md:h-7" />
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-[56px] w-[200px] rounded-lg shadow-sm" />
                <Skeleton className="h-[56px] w-[180px] rounded-lg shadow-sm" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-8 w-36 rounded-full shadow-sm" />
              </div>
              <Skeleton className="h-16 w-full rounded-lg shadow-sm" />
              <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm">
                <Skeleton className="mt-1 h-4 w-4 flex-shrink-0 rounded" />
                <div className="flex w-full flex-col space-y-1">
                  <Skeleton className="h-5 w-3/4 md:h-6" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
              <div className="rounded-md border border-gray-200 bg-gray-50 p-2.5 shadow-sm">
                <div className="flex flex-col">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-1.5 h-4 w-full" />
                  <Skeleton className="mt-1.5 h-4 w-full" />
                  <Skeleton className="mt-1.5 h-4 w-4/5" />
                  <Skeleton className="mt-0.5 h-2.5 w-24" />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <Skeleton className="h-9 w-24 rounded-md shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일에서만 표시되는 버튼들 스켈레톤 */}
      <div className="mt-4 flex flex-col gap-3 sm:hidden">
        <Skeleton className="h-9 w-full rounded-md shadow-sm" />
        <Skeleton className="h-9 w-full rounded-md shadow-sm" />
      </div>
    </div>
  );
}

export default function BookInfo(props: Props) {
  return (
    <Suspense fallback={<BookInfoSkeleton />}>
      <BookInfoContent {...props} />
    </Suspense>
  );
}
