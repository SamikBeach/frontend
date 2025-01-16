'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/UserAvatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';
import { RefObject, Suspense, useState } from 'react';
import ReviewContent from '../Review/ReviewContent';
import { toast } from '../ui/sonner';
import { WriteReviewDialog } from '../WriteReviewDialog';
import DeleteReviewDialog from './DeleteReviewDialog';
import ReviewActions from './ReviewActions';

interface Props {
  reviewId: number;
  commentListRef: RefObject<HTMLDivElement | null>;
}

function ReviewInfoContent({ reviewId, commentListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const { data: review } = useSuspenseQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReviewDetail(reviewId),
    select: response => response.data,
  });

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      // 리뷰 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >(
        {
          queryKey: ['reviews'],
          exact: false,
        },
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                data: page.data.data.map((review: Review) =>
                  review.id === review.id
                    ? {
                        ...review,
                        isLiked: !review.isLiked,
                        likeCount: review.isLiked
                          ? review.likeCount - 1
                          : review.likeCount + 1,
                      }
                    : review
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 업데이트
      queryClient.setQueryData<AxiosResponse<Review>>(
        ['review', review.id],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: !oldData.data.isLiked,
              likeCount: oldData.data.isLiked
                ? oldData.data.likeCount - 1
                : oldData.data.likeCount + 1,
            },
          };
        }
      );
    },
    onError: () => {
      // 리뷰 목록 쿼리 데이터 원상 복구
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >(
        {
          queryKey: ['reviews'],
          exact: false,
        },
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                data: page.data.data.map((review: Review) =>
                  review.id === review.id
                    ? {
                        ...review,
                        isLiked: review.isLiked,
                        likeCount: review.likeCount,
                      }
                    : review
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 원상 복구
      queryClient.setQueryData<AxiosResponse<Review>>(
        ['review', review.id],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: review.isLiked,
              likeCount: review.likeCount,
            },
          };
        }
      );
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => reviewApi.deleteReview(review.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });

      toast.success('리뷰가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    toggleLike();
  };

  const handleCommentClick = () => {
    commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMyReview = review.user.id === currentUser?.id;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-3xl font-bold tracking-tight text-gray-900">
                {review.title}
              </DialogTitle>
              <Link
                href={`/book/${review.book.id}`}
                target="_blank"
                className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5 transition-colors hover:bg-gray-100"
              >
                <img
                  src={review.book.imageUrl ?? 'https://picsum.photos/200/300'}
                  className="h-7 w-5 rounded-sm object-cover shadow-sm"
                  alt={review.book.title}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-medium text-gray-900">
                    {review.book.title}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {review.book.authorBooks
                      .map(authorBook => authorBook.author.nameInKor)
                      .join(', ')}
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <UserAvatar user={review.user} size="sm" />
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">
                {format(new Date(review.createdAt), 'yyyy년 M월 d일 HH시 mm분')}
              </span>
            </div>
          </div>
          {isMyReview && (
            <ReviewActions
              onEdit={() => setShowEditDialog(true)}
              onDelete={() => setShowDeleteAlert(true)}
            />
          )}
        </div>

        <div className="mb-8 whitespace-pre-wrap text-base leading-relaxed text-gray-800">
          <ReviewContent
            content={review.content}
            className="text-base leading-relaxed text-gray-800"
          />
        </div>

        <div className="flex justify-center gap-2">
          <LikeButton
            isLiked={review.isLiked ?? false}
            likeCount={review.likeCount}
            onClick={handleLikeClick}
          />
          <CommentButton
            commentCount={review.commentCount}
            onClick={handleCommentClick}
          />
        </div>
      </div>
      <DeleteReviewDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={() => {
          deleteReview();
        }}
      />
      <WriteReviewDialog
        bookId={review.book.id}
        reviewId={review.id}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        initialTitle={review.title}
        initialContent={review.content}
        isEditMode
      />
    </>
  );
}

function ReviewInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-96" />
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-2" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5">
          <Skeleton className="h-14 w-10 rounded-sm" />
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      <div className="flex justify-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

export default function ReviewInfo(props: Props) {
  return (
    <Suspense fallback={<ReviewInfoSkeleton />}>
      <ReviewInfoContent {...props} />
    </Suspense>
  );
}
