'use client';

import { authorApi } from '@/apis/author/author';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthorQueryData } from '@/hooks/queries/useAuthorQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatAuthorLifespan } from '@/utils/date';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { RefObject, Suspense, useState } from 'react';
import { LoginDialog } from '../LoginDialog';

interface Props {
  authorId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function AuthorInfoContent({ authorId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();

  const { updateAuthorLikeQueryData } = useAuthorQueryData();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="flex gap-4">
          <AuthorImage
            imageUrl={author.imageUrl}
            name={author.nameInKor}
            width={140}
            height={140}
            className="cursor-pointer rounded-full"
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
                <div className="flex items-baseline gap-3">
                  <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
                    {author.nameInKor}
                  </DialogTitle>
                  <div className="flex items-center gap-3 text-gray-800">
                    <span className="text-base font-bold">{author.name}</span>
                    <span className="text-sm font-medium">
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

              <div className="flex flex-col items-start gap-1">
                <p
                  className={`whitespace-pre-wrap text-sm leading-relaxed text-gray-800 ${
                    !isExpanded ? 'line-clamp-3' : ''
                  }`}
                >
                  {author.description}
                </p>
                {author.description && author.description.length > 200 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mb-1 h-2 p-0 text-blue-600 hover:bg-transparent hover:text-blue-500"
                  >
                    {isExpanded ? '접기' : '더보기'}
                  </Button>
                )}
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
      <div className="flex gap-4">
        <Skeleton className="h-[140px] min-h-[140px] w-[140px] min-w-[140px] shrink-0 rounded-full" />
        <div className="flex w-full flex-col justify-between">
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
