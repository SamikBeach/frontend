'use client';

import { authorApi } from '@/apis/author/author';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { RefObject, Suspense } from 'react';
import { useAuthorQueryData } from './hooks/useAuthorQueryData';

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
      <div className="flex gap-6">
        <div className="group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200">
          <img
            src={author.imageUrl ?? 'https://picsum.photos/200/200'}
            alt={author.nameInKor}
            className="absolute inset-0 h-full w-full object-cover"
            width={200}
            height={200}
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">{author.nameInKor}</h1>
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
      <div className="flex gap-6">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
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
