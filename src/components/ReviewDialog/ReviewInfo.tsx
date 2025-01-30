'use client';

import { reviewApi } from '@/apis/review/review';
import BookImage from '@/components/BookImage/BookImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar } from '@/components/UserAvatar';
import { useReviewQueryData } from '@/hooks/queries/useReviewQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { isMobileDevice } from '@/utils/responsive';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { RefObject, Suspense, useState } from 'react';
import { LoginDialog } from '../LoginDialog';
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
  const { close } = useDialogQuery({ type: 'review' });
  const router = useRouter();
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

  const { open: openBookDialog } = useDialogQuery({
    type: 'book',
  });

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
      close();
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

  const handleEdit = () => {
    if (isMobileDevice()) {
      router.push(
        `/write-review?bookId=${review.book.id}&reviewId=${review.id}`
      );
      return;
    }
    setShowEditDialog(true);
  };

  const isMyReview = review.user.id === currentUser?.id;

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <DialogTitle className="text-3xl font-bold tracking-tight text-gray-900">
                {review.title}
              </DialogTitle>
              <div
                className="flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-gray-50 px-2 py-1 transition-colors hover:bg-gray-100"
                onClick={() => openBookDialog(review.book.id)}
              >
                <BookImage
                  imageUrl={review.book.imageUrl}
                  title={review.book.title}
                  width={20}
                  height={28}
                  className="rounded-sm shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-900">
                    {review.book.title}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {review.book.authorBooks
                      .map(authorBook => authorBook.author.nameInKor)
                      .join(', ')}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-2">
                <UserAvatar user={review.user} size="sm" />
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-500">
                {format(new Date(review.createdAt), 'yyyy년 M월 d일 HH시 mm분')}
              </span>
            </div>
          </div>
          {isMyReview && (
            <ReviewActions
              onEdit={handleEdit}
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
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
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
