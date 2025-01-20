'use client';

import { authorApi } from '@/apis/author/author';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthorQueryData } from '@/hooks/queries/useAuthorQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { RefObject, Suspense } from 'react';

interface Props {
  authorId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function AuthorInfoContent({ authorId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const { updateAuthorLike } = useAuthorQueryData();
  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => authorApi.toggleAuthorLike(author.id),
    onMutate: () => {
      updateAuthorLike({ authorId: author.id, isOptimistic: true });
    },
    onError: () => {
      updateAuthorLike({
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
    if (!currentUser) return;
    toggleLike();
  };

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="group relative h-[140px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200">
          <img
            src={author.imageUrl ?? 'https://picsum.photos/140/140'}
            alt={author.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={140}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="text-2xl font-bold">
              {author.nameInKor}
            </DialogTitle>
            <p className="text-gray-500">{author.name}</p>
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
  );
}

function AuthorInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="h-[140px] w-[140px] shrink-0 rounded-full" />
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
