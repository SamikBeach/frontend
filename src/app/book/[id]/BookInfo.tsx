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
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useBookQueryData } from '@/hooks/queries/useBookQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { cn } from '@/utils/common';
import { formatAuthorLifespan } from '@/utils/date';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { josa } from 'josa';
import { BookIcon, Edit3Icon, MessageCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RefObject, Suspense, useEffect, useState } from 'react';
import BookChat from './BookChat';

interface Props {
  bookId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function BookInfoContent({ bookId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { open: openAuthorDialog } = useDialogQuery({ type: 'author' });

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openWriteReviewDialog, setOpenWriteReviewDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWriteReviewClick = () => {
    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/write-review?bookId=${book.id}`);
    } else {
      setOpenWriteReviewDialog(true);
    }
  };

  const handleAuthorClick = (authorId: number) => {
    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/author/${authorId}`);
    } else {
      openAuthorDialog(authorId);
    }
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
              className="flex-shrink-0 cursor-pointer rounded-lg transition-transform duration-300 hover:scale-[1.02] md:h-[300px] md:w-[200px]"
              onClick={() =>
                window.open(
                  `https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${book.isbn}`,
                  '_blank'
                )
              }
            />
            <div className="flex flex-col items-center gap-3">
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
              <Button
                onClick={toggleChat}
                variant="outline"
                size="sm"
                className={cn(
                  'hidden w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-none transition-all sm:flex',
                  isChatOpen
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                <MessageCircleIcon className="h-4 w-4" />
                {josa(
                  `${book.authorBooks[0]?.author.nameInKor || '작가'}#{과} 대화하기`
                )}
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
                    {book.title}
                  </h1>
                </div>

                {/* 작가 정보 섹션 */}
                <div className="flex flex-wrap gap-4">
                  {book.authorBooks.map(authorBook => (
                    <div
                      key={authorBook.author.id}
                      onClick={() => handleAuthorClick(authorBook.author.id)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2 transition-colors hover:bg-gray-100"
                    >
                      <AuthorImage
                        imageUrl={authorBook.author.imageUrl}
                        name={authorBook.author.nameInKor}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
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
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 md:text-base">
                      {book.publisher}
                      {book.publisher && formattedPublicationDate && (
                        <span className="mx-1 font-medium">·</span>
                      )}
                      {formattedPublicationDate}
                    </span>
                  </div>
                </div>
                {book.bookOriginalWorks[0] && (
                  <div className="flex items-start gap-2 rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm">
                    <BookIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">원전</span>
                      <span className="text-gray-600">
                        {book.bookOriginalWorks[0].originalWork.title}
                        <span className="ml-1 text-gray-500">
                          ({book.bookOriginalWorks[0].originalWork.titleInEng})
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {book.description && (
                <div className="space-y-2 rounded-md bg-gray-50 p-4">
                  <div className="flex flex-col gap-2">
                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : '8.5rem' }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="relative overflow-hidden"
                    >
                      <motion.p
                        initial={false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={cn(
                          'whitespace-pre-wrap text-sm leading-relaxed text-gray-700 md:text-base',
                          !isExpanded && 'line-clamp-7'
                        )}
                      >
                        {book.description}
                      </motion.p>
                      <p className="mt-1 text-xs text-gray-400">
                        정보 제공: 알라딘
                      </p>
                      {!isExpanded && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent"
                        />
                      )}
                    </motion.div>
                    <div className="flex items-center gap-2">
                      {book.description && book.description.length > 200 && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-1"
                          >
                            <Button
                              variant="outline"
                              onClick={() => setIsExpanded(!isExpanded)}
                              className="mt-1 h-8 w-full border-gray-200 bg-white text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                            >
                              {isExpanded ? '접기' : '더보기'}
                            </Button>
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={handleWriteReviewClick}
                  className="w-full bg-white font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 md:w-auto"
                >
                  <Edit3Icon className="mr-1 h-4 w-4" />
                  리뷰 쓰기
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 모바일에서만 표시되는 대화하기 버튼 */}
        <div className="sm:hidden">
          <Button
            onClick={toggleChat}
            variant="outline"
            size="sm"
            className={cn(
              'w-full items-center justify-center gap-1.5 border px-4 py-2 text-sm font-medium shadow-none transition-all',
              isChatOpen
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <MessageCircleIcon className="h-4 w-4" />
            {josa(
              `${book.authorBooks[0]?.author.nameInKor || '작가'}#{과} 대화하기`
            )}
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
          <Skeleton className="h-[200px] w-[140px] shrink-0 rounded-lg md:h-[300px] md:w-[200px]" />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
            {/* 모바일에서는 숨김 처리 */}
            <Skeleton className="hidden h-9 w-full rounded-md sm:block" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Skeleton className="h-8 w-48 md:h-10" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Skeleton className="h-6 w-32 md:h-7" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div className="space-y-2 rounded-md bg-gray-50 p-4">
                <div className="flex flex-col gap-2">
                  <div
                    className="relative overflow-hidden"
                    style={{ height: '8.5rem' }}
                  >
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="mt-2 h-5 w-full" />
                    <Skeleton className="mt-2 h-5 w-full" />
                    <Skeleton className="mt-2 h-5 w-full" />
                    <Skeleton className="mt-2 h-5 w-4/5" />
                    <Skeleton className="mt-2 h-5 w-3/5" />
                    <Skeleton className="mt-2 h-5 w-2/5" />
                  </div>
                  <Skeleton className="mt-2 h-8 w-full rounded-md" />
                </div>
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일에서만 표시되는 대화하기 버튼 스켈레톤 */}
      <div className="mt-4 sm:hidden">
        <Skeleton className="h-9 w-full rounded-md" />
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
