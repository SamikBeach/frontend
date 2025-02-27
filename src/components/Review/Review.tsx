import { reviewApi } from '@/apis/review/review';
import { Review as ReviewType } from '@/apis/review/types';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useReviewQueryData } from '@/hooks/queries/useReviewQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/common';
import { formatDate } from '@/utils/date';
import { isMobileDevice } from '@/utils/responsive';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import BookImage from '../BookImage/BookImage';
import BookLink from '../BookLink/BookLink';
import CommentEditor from '../CommentEditor/CommentEditor';
import { LoginDialog } from '../LoginDialog';
import { Button } from '../ui/button';
import { toast } from '../ui/sonner';
import { UserAvatar } from '../UserAvatar';
import { WriteReviewDialog } from '../WriteReviewDialog';
import CommentList from './CommentList';
import DeleteReviewDialog from './DeleteReviewDialog';
import ReportReviewActions from './ReportReviewActions';
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

  const { open: openBookDialog } = useDialogQuery({ type: 'book' });

  const currentUser = useCurrentUser();
  const router = useRouter();
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
      <div className="flex flex-col gap-3">
        {/* 리뷰 헤더 */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-1 flex-col gap-1.5">
            <h3
              className={cn(
                'text-lg font-bold leading-tight text-gray-900',
                onClickTitle
                  ? 'cursor-pointer transition-colors hover:text-blue-600'
                  : ''
              )}
              onClick={onClickTitle}
            >
              {review.title}
            </h3>

            {!hideUserInfo && (
              <div className="flex items-center gap-2">
                <UserAvatar user={review.user} size="sm" />
                <span className="text-xs text-gray-500">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            )}
          </div>

          {/* 책 정보 (데스크톱) */}
          {showBookInfo && isDesktop && (
            <div
              className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-gray-50 px-3 py-2 transition-colors hover:bg-gray-100"
              onClick={() => openBookDialog(review.book.id)}
            >
              <BookImage
                imageUrl={review.book.imageUrl}
                title={review.book.title}
                width={24}
                height={32}
                className="rounded-md shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  {review.book.title}
                </span>
                <span className="text-xs text-gray-600">
                  {review.book.authorBooks
                    .map(authorBook => authorBook.author.nameInKor)
                    .join(', ')}
                </span>
              </div>
            </div>
          )}

          {/* 액션 버튼 */}
          {isMyReview ? (
            <div className="ml-auto">
              <ReviewActions
                onEdit={handleEdit}
                onDelete={() => setShowDeleteAlert(true)}
              />
            </div>
          ) : currentUser ? (
            <div className="ml-auto">
              <ReportReviewActions
                reviewId={review.id}
                userId={review.user.id}
                userNickname={review.user.nickname}
              />
            </div>
          ) : null}
        </div>

        {/* 책 정보 (모바일) */}
        {showBookInfo && !isDesktop && (
          <div className="mb-1 block w-fit">
            <BookLink book={review.book} />
          </div>
        )}

        {/* 리뷰 내용과 액션 버튼을 하나의 div로 묶어서 간격 조정 */}
        <div className="flex flex-col gap-1">
          {/* 리뷰 내용 */}
          <div className="w-full">
            {isExpanded ? (
              <div className="rounded-xl border border-gray-100 bg-white p-3">
                <ReviewContent
                  content={review.content}
                  className="text-base leading-relaxed text-gray-800"
                />
              </div>
            ) : (
              <div
                ref={contentRef}
                className="relative rounded-xl border border-gray-100 bg-white p-3"
                onClick={() => !isDesktop && isTruncated && setIsExpanded(true)}
              >
                <ReviewContent
                  content={review.content}
                  className={cn(
                    'line-clamp-3 text-base leading-relaxed text-gray-800',
                    { 'cursor-pointer': !isDesktop && isTruncated }
                  )}
                />
                {isTruncated && (
                  <div className="mt-1 flex justify-end">
                    <Button
                      variant="link"
                      onClick={e => {
                        e.stopPropagation();
                        setIsExpanded(true);
                      }}
                      className="h-auto p-0 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      더보기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 리뷰 액션 */}
          {!hideActions && (
            <div className="flex justify-between">
              <div className="inline-flex items-center gap-1">
                <Button
                  variant="ghost"
                  className={cn(
                    'group flex h-7 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50',
                    {
                      'bg-blue-50 text-blue-600 hover:bg-blue-100':
                        review.isLiked,
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
                    className={cn('mr-1 h-3.5 w-3.5', {
                      'fill-blue-500 stroke-blue-500': review.isLiked,
                      'stroke-gray-600': !review.isLiked,
                    })}
                  />
                  <span>
                    {review.likeCount > 0 ? review.likeCount : '좋아요'}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    if (disableClickActions) return;
                    handleReplyButtonClick();
                  }}
                  className={cn(
                    'group flex h-7 items-center gap-1 rounded-full px-2.5 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50',
                    {
                      'bg-gray-50 text-blue-600': isReplying,
                      'cursor-pointer': !disableClickActions,
                      'cursor-default': disableClickActions,
                    }
                  )}
                >
                  <MessageSquareIcon
                    className={cn('mr-1 h-3.5 w-3.5', {
                      'stroke-blue-600': isReplying,
                      'stroke-gray-600': !isReplying,
                    })}
                  />
                  <span>
                    {review.commentCount > 0 ? review.commentCount : '댓글'}
                  </span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 댓글 영역 */}
      {!hideActions && (
        <AnimatePresence>
          {isReplying && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative mt-4 overflow-hidden pl-10"
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
