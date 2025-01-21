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
            width={200}
            height={200}
            className="cursor-pointer rounded-full"
            onClick={() =>
              window.open(
                `https://en.wikipedia.org/wiki/${author.name}`,
                '_blank'
              )
            }
          />
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold">{author.nameInKor}</h1>
              <p className="text-gray-500">{author.name}</p>
              <p className="text-gray-400">
                {formatAuthorLifespan(
                  author.bornDate,
                  author.bornDateIsBc,
                  author.diedDate,
                  author.diedDateIsBc
                )}
              </p>
              <p className="mttext-xs text-gray-400">
                작가 정보 제공: 위키피디아
              </p>
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
        <Skeleton className="h-[200px] min-h-[200px] w-[200px] min-w-[200px] shrink-0 rounded-full" />
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
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
