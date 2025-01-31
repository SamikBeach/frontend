import { reviewApi } from '@/apis/review/review';
import { Review as ReviewType } from '@/apis/review/types';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useReviewQueryData } from '@/hooks/queries/useReviewQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/common';
import { formatDate } from '@/utils/date';
import { isMobileDevice } from '@/utils/responsive';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import BookLink from '../BookLink/BookLink';
import CommentEditor from '../CommentEditor/CommentEditor';
import { LoginDialog } from '../LoginDialog';
import { Button } from '../ui/button';
import { toast } from '../ui/sonner';
import { UserAvatar } from '../UserAvatar';
import { WriteReviewDialog } from '../WriteReviewDialog';
import CommentList from './CommentList';
import DeleteReviewDialog from './DeleteReviewDialog';
import ReviewActions from './ReviewActions';
import ReviewContent from './ReviewContent';

interface Props {
  review: ReviewType;
  hideActions?: boolean;
  hideUserInfo?: boolean;
  showBookInfo?: boolean;
  disableClickActions?: boolean;
  onClickTitle?: () => void;
}

export default function Review({
  review,
  hideActions = false,
  hideUserInfo = false,
  showBookInfo = false,
  disableClickActions = false,
  onClickTitle,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const currentUser = useCurrentUser();
  const router = useRouter();
  const isMd = useMediaQuery('(min-width: 768px)');

  const isMyReview = currentUser?.id === review.user.id;

  const { updateReviewLikeQueryData, deleteReviewDataQueryData } =
    useReviewQueryData();
  const { createCommentQueryData } = useCommentQueryData();

  const { mutate: createComment } = useMutation({
    mutationFn: (content: string) =>
      reviewApi.createComment(review.id, { content }),
    onSuccess: response => {
      createCommentQueryData({ reviewId: review.id, comment: response.data });
      toast.success('댓글이 작성되었습니다.');
      setReplyToUser(null);
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
    },
  });

  useEffect(() => {
    if (!contentRef.current) return;

    const checkTruncation = () => {
      const element = contentRef.current;
      if (!element) return;

      // 여러 줄의 텍스트가 있을 수 있으므로 모든 p 태그의 높이를 합산
      const contentHeight = Array.from(element.querySelectorAll('p')).reduce(
        (total, p) => total + p.scrollHeight,
        0
      );
      const containerHeight = element.clientHeight;

      setIsTruncated(contentHeight > containerHeight);
    };

    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(contentRef.current);

    // 초기 체크
    setTimeout(checkTruncation, 0);

    return () => {
      resizeObserver.disconnect();
    };
  }, [review.content]);

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      if (!currentUser) return;
      updateReviewLikeQueryData({
        reviewId: review.id,
        bookId: review.book.id,
        authorId: review.book.authorBooks?.[0]?.author.id,
        isOptimistic: true,
      });
    },
    onError: () => {
      updateReviewLikeQueryData({
        reviewId: review.id,
        bookId: review.book.id,
        authorId: review.book.authorBooks?.[0]?.author.id,
        isOptimistic: false,
        currentStatus: {
          isLiked: review.isLiked ?? false,
          likeCount: review.likeCount,
        },
      });
      toast.error('좋아요 처리에 실패했습니다.');
    },
  });

  const handleReply = useCallback((user: { nickname: string }) => {
    setIsReplying(true);

    if (editorRef.current) {
      editorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }

    setTimeout(() => {
      setReplyToUser(user);
    }, 500);
  }, []);

  const handleReplyButtonClick = () => {
    // Focus editor after animation completes
    setIsReplying(prev => !prev);

    if (!isReplying) {
      setTimeout(() => {
        editorRef.current?.focus();
      }, 300);
    }
  };

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

  const handleEdit = () => {
    if (isMobileDevice()) {
      router.push(
        `/write-review?bookId=${review.book.id}&reviewId=${review.id}`
      );
      return;
    }
    setShowEditDialog(true);
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h3
              className={`text-xl font-medium ${onClickTitle ? 'cursor-pointer hover:underline' : ''}`}
              onClick={onClickTitle}
            >
              {review.title}
            </h3>
            {showBookInfo && (
              <div className="block w-fit">
                <BookLink book={review.book} />
              </div>
            )}
          </div>
          {isMyReview && (
            <div className="ml-auto p-0.5">
              <ReviewActions
                onEdit={handleEdit}
                onDelete={() => setShowDeleteAlert(true)}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!hideUserInfo && (
            <>
              <UserAvatar user={review.user} size="sm" />{' '}
              <p className="text-xs text-gray-500">
                {formatDate(review.createdAt)}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full">
            {isExpanded ? (
              <ReviewContent
                content={review.content}
                className="text-base leading-relaxed text-gray-800"
              />
            ) : (
              <div
                ref={contentRef}
                className="relative"
                onClick={() => !isMd && isTruncated && setIsExpanded(true)}
              >
                <ReviewContent
                  content={review.content}
                  className={cn(
                    'line-clamp-3 text-base leading-relaxed text-gray-800',
                    { 'cursor-pointer': !isMd && isTruncated }
                  )}
                />
                {isTruncated && (
                  <Button
                    variant="link"
                    onClick={() => setIsExpanded(true)}
                    className="h-[14px] p-0 text-sm text-blue-500"
                  >
                    더보기
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
        {!hideActions && (
          <div className="flex justify-between">
            <div className="flex items-center gap-0.5 text-gray-500">
              <Button
                variant="ghost"
                className={cn(
                  'group flex h-5 w-5 items-center gap-0.5 text-xs text-gray-500 transition-colors hover:bg-transparent hover:text-gray-900',
                  {
                    'cursor-pointer': !disableClickActions,
                    'cursor-default': disableClickActions,
                  }
                )}
                onClick={() => {
                  if (disableClickActions) {
                    return;
                  }

                  if (!currentUser) {
                    setOpenLoginDialog(true);

                    return;
                  }

                  toggleLike();
                }}
              >
                <ThumbsUpIcon
                  className={`!h-3.5 !w-3.5 ${
                    review.isLiked
                      ? 'fill-blue-500 stroke-blue-500'
                      : 'stroke-gray-500'
                  } transition-colors group-hover:stroke-gray-900`}
                />
                <span>{review.likeCount}</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (disableClickActions) return;

                  handleReplyButtonClick();
                }}
                className={cn(
                  'group flex h-5 w-5 items-center gap-0.5 text-xs text-gray-500 transition-colors hover:bg-transparent hover:text-gray-900',
                  {
                    'cursor-pointer': !disableClickActions,
                    'cursor-default': disableClickActions,
                  }
                )}
              >
                <MessageSquareIcon className="mt-0.5 !h-3.5 !w-3.5 transition-colors group-hover:stroke-gray-900" />
                <span>{review.commentCount}</span>
              </Button>
            </div>
          </div>
        )}
      </div>
      {!hideActions && (
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="mt-4 overflow-hidden pl-10"
            >
              <div className="flex flex-col gap-4">
                <div className="p-0.5">
                  <CommentEditor
                    ref={editorRef}
                    onSubmit={createComment}
                    replyToUser={replyToUser ?? undefined}
                  />
                </div>
                <CommentList reviewId={review.id} onReply={handleReply} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <DeleteReviewDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={() => deleteReview()}
      />
      <WriteReviewDialog
        bookId={review.book.id}
        reviewId={review.id}
        authorId={review.book.authorBooks?.[0]?.author.id}
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
