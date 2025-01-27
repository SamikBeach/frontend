'use client';

import { authorApi } from '@/apis/author/author';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { LoginDialog } from '@/components/LoginDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthorQueryData } from '@/hooks/queries/useAuthorQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatAuthorLifespan } from '@/utils/date';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { RefObject, Suspense, useState } from 'react';

interface Props {
  authorId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function AuthorInfoContent({ authorId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

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
            <div className="flex flex-col gap-0.5">
              <h1 className="text-lg font-bold md:text-2xl">
                {author.nameInKor}
              </h1>
              <p className="text-sm text-gray-500 md:text-base">
                {author.name}
              </p>
              <p className="text-sm text-gray-400 md:text-base">
                {formatAuthorLifespan(
                  author.bornDate,
                  author.bornDateIsBc,
                  author.diedDate,
                  author.diedDateIsBc
                )}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                정보 제공: 위키피디아
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 md:flex-row">
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
