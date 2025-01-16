import { reviewApi } from '@/apis/review/review';
import { Review as ReviewType } from '@/apis/review/types';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatDate } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import CommentEditor from '../CommentEditor/CommentEditor';
import { Button } from '../ui/button';
import { UserAvatar } from '../UserAvatar';
import CommentList from './CommentList';

const MAX_CONTENT_LENGTH = 300;

interface Props {
  review: ReviewType;
  hideActions?: boolean;
  showBookInfo?: boolean;
}

export default function Review({
  review,
  hideActions = false,
  showBookInfo = false,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );
  const shouldShowMore = review.content.length > MAX_CONTENT_LENGTH;
  const bookDialog = useDialogQuery({ type: 'book' });
  const reviewDialog = useDialogQuery({ type: 'review' });
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      // 리뷰 목록에서의 낙관적 업데이트
      queryClient.setQueryData(['reviews', review.book.id], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.map((r: ReviewType) =>
              r.id === review.id
                ? {
                    ...r,
                    isLiked: !r.isLiked,
                    likeCount: r.likeCount + (r.isLiked ? -1 : 1),
                  }
                : r
            ),
          },
        })),
      }));

      // 리뷰 상세에서의 낙관적 업데이트
      queryClient.setQueryData(['review', review.id], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          isLiked: !review.isLiked,
          likeCount: review.likeCount + (review.isLiked ? -1 : 1),
        },
      }));
    },
    onError: () => {
      // 리뷰 목록에서의 롤백
      queryClient.setQueryData(['reviews', review.book.id], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.map((r: ReviewType) =>
              r.id === review.id
                ? {
                    ...r,
                    isLiked: review.isLiked,
                    likeCount: review.likeCount,
                  }
                : r
            ),
          },
        })),
      }));

      // 리뷰 상세에서의 롤백
      queryClient.setQueryData(['review', review.id], (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          isLiked: review.isLiked,
          likeCount: review.likeCount,
        },
      }));

      toast.error('좋아요 처리에 실패했습니다.');
    },
  });

  const { mutate: createComment } = useMutation({
    mutationFn: (content: string) =>
      reviewApi.createComment(review.id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', review.id] });
      toast.success('댓글이 작성되었습니다.');
      setReplyToUser(null);
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
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

  const displayContent =
    shouldShowMore && !isExpanded
      ? review.content.slice(0, MAX_CONTENT_LENGTH)
      : review.content;

  const handleReplyButtonClick = () => {
    // Focus editor after animation completes
    setIsReplying(prev => !prev);

    if (!isReplying) {
      setTimeout(() => {
        editorRef.current?.focus();
      }, 300);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <UserAvatar user={review.user} />
          <p className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <h3
            onClick={() => reviewDialog.open(review.id)}
            className="cursor-pointer text-lg font-medium hover:underline"
          >
            {review.title}
          </h3>
          {showBookInfo && (
            <span
              onClick={() => bookDialog.open(review.book.id)}
              className="cursor-pointer text-sm font-medium hover:underline"
            >
              {review.book.title}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full">
            {displayContent}
            {shouldShowMore && !isExpanded && (
              <Button
                variant="link"
                onClick={() => setIsExpanded(true)}
                className="h-[14px] p-0 text-sm text-gray-500"
              >
                ...더보기
              </Button>
            )}
          </div>
        </div>
        {!hideActions && (
          <div className="flex justify-between">
            <div className="flex items-center gap-2 text-gray-500">
              <Button
                variant="ghost"
                onClick={() => toggleLike()}
                className={`h-[14px] p-0 hover:bg-transparent ${
                  review.isLiked ? 'font-bold text-gray-900' : ''
                }`}
              >
                좋아요
              </Button>
              <Button
                variant="ghost"
                onClick={handleReplyButtonClick}
                className="h-[14px] p-0 hover:bg-transparent"
              >
                답글 달기
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-0.5">
                <ThumbsUpIcon
                  className={`h-4 w-4 ${
                    review.isLiked
                      ? 'fill-blue-500 stroke-blue-500'
                      : 'stroke-gray-500'
                  }`}
                />
                <span>{review.likeCount}</span>
              </div>
              <div
                onClick={() => reviewDialog.open(review.id)}
                className="flex cursor-pointer items-center gap-0.5"
              >
                <MessageSquareIcon className="mt-0.5 h-4 w-4 stroke-gray-500" />
                <span>{review.commentCount}</span>
              </div>
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
                    onCancel={() => {
                      setIsReplying(false);
                      setReplyToUser(null);
                    }}
                    replyToUser={replyToUser ?? undefined}
                  />
                </div>
                <CommentList reviewId={review.id} onReply={handleReply} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
