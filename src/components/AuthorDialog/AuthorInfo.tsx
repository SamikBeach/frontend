'use client';

import { authorApi } from '@/apis/author/author';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { LoginDialog } from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthorQueryData } from '@/hooks/queries/useAuthorQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/utils/common';
import { formatAuthorLifespan } from '@/utils/date';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { josa } from 'josa';
import { MessageCircleIcon } from 'lucide-react';
import { RefObject, Suspense, useEffect, useState } from 'react';
import AuthorChat from '../AuthorDialog/AuthorChat';

interface Props {
  authorId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function AuthorInfoContent({ authorId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { updateAuthorLikeQueryData } = useAuthorQueryData();

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  // 작가가 바뀌면 대화창 닫기
  useEffect(() => {
    setIsChatOpen(false);
  }, [authorId]);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => authorApi.toggleAuthorLike(author.id),
    onMutate: () => {
      updateAuthorLikeQueryData({ authorId: author.id, isOptimistic: true });
    },
    onError: () => {
      updateAuthorLikeQueryData({
        authorId: author.id,
        isOptimistic: false,
        currentStatus: {
          isLiked: author.isLiked,
          likeCount: author.likeCount,
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

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 bg-white pt-4 sm:flex-row">
          <div className="flex flex-col items-center justify-center gap-4 sm:h-full sm:justify-start">
            <AuthorImage
              imageUrl={author.imageUrl}
              name={author.nameInKor}
              width={140}
              height={140}
              className="flex-shrink-0 cursor-pointer rounded-full border border-gray-100 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md md:h-[200px] md:w-[200px]"
              onClick={() =>
                window.open(
                  `https://en.wikipedia.org/wiki/${author.name}`,
                  '_blank'
                )
              }
            />
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-3">
                <LikeButton
                  isLiked={author.isLiked}
                  likeCount={author.likeCount}
                  onClick={handleLikeClick}
                />
                <CommentButton
                  commentCount={author.reviewCount}
                  onClick={handleReviewClick}
                />
              </div>
              {/* 모바일에서는 숨김 처리 */}
              <Button
                onClick={toggleChat}
                variant="outline"
                size="sm"
                className={cn(
                  'hidden w-full items-center justify-center gap-1.5 border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm transition-all sm:flex',
                  isChatOpen
                    ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                <MessageCircleIcon className="h-4 w-4" />
                {josa(`${author.nameInKor}#{과} 대화하기`)}
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
                    {author.nameInKor}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-700">
                    <span className="text-base font-bold md:text-lg">
                      {author.name}
                    </span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 shadow-sm md:text-base">
                      {formatAuthorLifespan(
                        author.bornDate,
                        author.bornDateIsBc,
                        author.diedDate,
                        author.diedDateIsBc
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    {author.genre && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 shadow-sm">
                        {author.genre.genreInKor}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
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
                      {author.description}
                    </motion.p>
                    {isExpanded && (
                      <p className="mt-1 text-xs text-gray-500">
                        정보 제공: 위키피디아
                      </p>
                    )}
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
                    {author.description && author.description.length > 200 && (
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
                            className="mt-1 h-8 w-full border-gray-200 bg-white text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 hover:text-blue-700"
                          >
                            {isExpanded ? '접기' : '더보기'}
                          </Button>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </div>
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
              'w-full items-center justify-center gap-1.5 border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm transition-all',
              isChatOpen
                ? 'bg-gray-50 text-gray-800 hover:bg-gray-100'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            )}
          >
            <MessageCircleIcon className="h-4 w-4" />
            {josa(`${author.nameInKor}#{과} 대화하기`)}
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
              <AuthorChat authorId={authorId} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function AuthorInfoSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6 bg-white pt-4 sm:flex-row">
        <div className="flex flex-col items-center justify-center gap-4 sm:h-full sm:justify-start">
          <Skeleton className="h-[140px] w-[140px] shrink-0 rounded-full border border-gray-100 shadow-sm md:h-[200px] md:w-[200px]" />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-3">
              <Skeleton className="h-9 w-20 rounded-full" />
              <Skeleton className="h-9 w-20 rounded-full" />
            </div>
            {/* 모바일에서는 숨김 처리 */}
            <Skeleton className="hidden h-9 w-full rounded-md shadow-sm sm:block" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <Skeleton className="h-8 w-48 md:h-10" />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <Skeleton className="h-6 w-32 md:h-7" />
                  <Skeleton className="h-6 w-40 rounded-full shadow-sm" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-24 rounded-full shadow-sm" />
              </div>
              <div className="space-y-2 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
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
                  <Skeleton className="mt-2 h-8 w-full rounded-md shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일에서만 표시되는 대화하기 버튼 스켈레톤 */}
      <div className="mt-4 sm:hidden">
        <Skeleton className="h-9 w-full rounded-md shadow-sm" />
      </div>
    </div>
  );
}

export default function AuthorInfo(props: Props) {
  return (
    <Suspense fallback={<AuthorInfoSkeleton />}>
      <AuthorInfoContent {...props} />
    </Suspense>
  );
}
