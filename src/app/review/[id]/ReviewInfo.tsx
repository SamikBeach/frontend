'use client';

import { reviewApi } from '@/apis/review/review';
import BookLink from '@/components/BookLink/BookLink';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { LoginDialog } from '@/components/LoginDialog';
import ReviewContent from '@/components/Review/ReviewContent';
import DeleteReviewDialog from '@/components/ReviewDialog/DeleteReviewDialog';
import ReviewActions from '@/components/ReviewDialog/ReviewActions';
import { UserAvatar } from '@/components/UserAvatar';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { useReviewQueryData } from '@/hooks/queries/useReviewQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { RefObject, Suspense, useState } from 'react';

interface Props {
  reviewId: number;
  commentListRef: RefObject<HTMLDivElement | null>;
}

function ReviewInfoContent({ reviewId, commentListRef }: Props) {
  const currentUser = useCurrentUser();
  const { updateReviewLikeQueryData, deleteReviewDataQueryData } =
    useReviewQueryData();

  const { data: review } = useSuspenseQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReviewDetail(reviewId),
    select: response => response.data,
  });

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      updateReviewLikeQueryData({
        reviewId: review.id,
        isOptimistic: true,
      });
    },
    onError: () => {
      updateReviewLikeQueryData({
        reviewId: review.id,
        isOptimistic: false,
        currentStatus: {
          isLiked: review.isLiked ?? false,
          likeCount: review.likeCount,
        },
      });
    },
  });

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => reviewApi.deleteReview(review.id),
    onSuccess: () => {
      deleteReviewDataQueryData({
        reviewId: review.id,
        bookId: review.book.id,
        authorId: review.book.authorBooks?.[0]?.author.id,
      });
      toast.success('리뷰가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('리뷰 삭제에 실패했습니다.');
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

  const handleCommentClick = () => {
    commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMyReview = review.user.id === currentUser?.id;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex justify-start">
                <BookLink book={review.book} className="md:hidden" />
              </div>
              <div className="flex flex-col gap-4 md:flex-row md:items-start">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  {review.title}
                </h1>
                <BookLink book={review.book} className="hidden md:flex" />
              </div>
              <div className="flex items-center gap-1">
                <UserAvatar user={review.user} size="sm" />
                <span className="text-gray-300">·</span>
                <span className="text-xs text-gray-500">
                  {format(
                    new Date(review.createdAt),
                    'yyyy년 M월 d일 HH시 mm분'
                  )}
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
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function ReviewInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-9 w-96" />
            <div className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 px-2 py-1">
              <Skeleton className="h-7 w-5 rounded-sm" />
              <div className="flex flex-col gap-0.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-4 w-2" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      <div className="flex justify-center gap-2">
        <Skeleton className="h-9 w-20 rounded-full" />
        <Skeleton className="h-9 w-20 rounded-full" />
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
