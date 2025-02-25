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
import { RefObject, Suspense, useState } from 'react';

interface Props {
  authorId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function AuthorInfoContent({ authorId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { updateAuthorLikeQueryData } = useAuthorQueryData();

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

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

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <AuthorImage
            imageUrl={author.imageUrl}
            name={author.nameInKor}
            width={140}
            height={140}
            className="flex-shrink-0 cursor-pointer rounded-full md:h-[200px] md:w-[200px]"
            onClick={() =>
              window.open(
                `https://en.wikipedia.org/wiki/${author.name}`,
                '_blank'
              )
            }
          />
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-0">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-800 md:text-3xl">
                    {author.nameInKor}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-0 text-gray-700">
                    <span className="text-base font-bold md:text-lg">
                      {author.name}
                    </span>
                    <span className="text-sm font-semibold md:text-base">
                      {formatAuthorLifespan(
                        author.bornDate,
                        author.bornDateIsBc,
                        author.diedDate,
                        author.diedDateIsBc
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-col gap-1">
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : '4.5rem' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="relative overflow-hidden"
                  >
                    <motion.p
                      initial={false}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className={cn(
                        'whitespace-pre-wrap text-sm leading-relaxed text-gray-700 md:text-base',
                        !isExpanded && 'line-clamp-3'
                      )}
                    >
                      {author.description}
                    </motion.p>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent"
                      />
                    )}
                  </motion.div>
                  {author.description && author.description.length > 200 && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button
                          variant="ghost"
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="h-4 p-0 text-blue-600 hover:bg-transparent hover:text-blue-500"
                        >
                          {isExpanded ? '접기' : '더보기'}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
                <p className="text-xs text-gray-400">정보 제공: 위키피디아</p>
              </div>
            </div>

            <div className="flex gap-2">
              <LikeButton
                isLiked={author.isLiked ?? false}
                likeCount={author.likeCount}
                onClick={handleLikeClick}
              />
              <CommentButton
                commentCount={author.reviewCount}
                onClick={handleReviewClick}
              />
            </div>
          </div>
        </div>
      </div>
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function AuthorInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <Skeleton className="h-[140px] w-[140px] shrink-0 rounded-full md:h-[200px] md:w-[200px]" />
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-6 w-3/5 md:h-8" />
            <Skeleton className="mt-0.5 h-5 w-2/5 md:h-6" />
            <Skeleton className="mt-0.5 h-5 w-3/5 md:h-6" />
            <Skeleton className="mt-1 h-4 w-24" />
          </div>

          <div className="flex w-full flex-col gap-2 md:flex-row">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </div>
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
