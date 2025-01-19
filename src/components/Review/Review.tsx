import { AuthorDetail } from '@/apis/author/types';
import { BookDetail } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review as ReviewType } from '@/apis/review/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatDate } from '@/utils/date';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
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
  showBookInfo?: boolean;
}

export default function Review({
  review,
  hideActions = false,
  showBookInfo = false,
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
  const bookDialog = useDialogQuery({ type: 'book' });
  const reviewDialog = useDialogQuery({ type: 'review' });
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const isMyReview = review.user.id === currentUser?.id;

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
      // 리뷰 목록에서의 낙관적 업데이트 (책)
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<PaginatedResponse<ReviewType>>>
      >(['book-reviews', review.book.id], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
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
        };
      });

      // 작가의 리뷰 목록에서의 낙관적 업데이트
      if (review.book.authorBooks?.[0]?.author.id) {
        queryClient.setQueryData<
          InfiniteData<AxiosResponse<PaginatedResponse<ReviewType>>>
        >(['author-reviews', review.book.authorBooks[0].author.id], old => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
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
          };
        });
      }

      // 리뷰 상세에서의 낙관적 업데이트
      queryClient.setQueryData<AxiosResponse<ReviewType>>(
        ['review', review.id],
        old => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              isLiked: !review.isLiked,
              likeCount: review.likeCount + (review.isLiked ? -1 : 1),
            },
          };
        }
      );
    },
    onError: () => {
      // 리뷰 목록에서의 롤백
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<PaginatedResponse<ReviewType>>>
      >(['reviews', review.book.id], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
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
        };
      });

      // 리뷰 상세에서의 롤백
      queryClient.setQueryData<AxiosResponse<ReviewType>>(
        ['review', review.id],
        old => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              isLiked: review.isLiked,
              likeCount: review.likeCount,
            },
          };
        }
      );

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
      // 책의 리뷰 목록 업데이트
      queryClient.setQueryData<
        InfiniteData<AxiosResponse<PaginatedResponse<ReviewType>>>
      >(['book-reviews', review.book.id], old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.filter(
                (r: ReviewType) => r.id !== review.id
              ),
            },
          })),
        };
      });

      // 작가의 리뷰 목록 업데이트
      if (review.book.authorBooks?.[0]?.author.id) {
        queryClient.setQueryData<
          InfiniteData<AxiosResponse<PaginatedResponse<ReviewType>>>
        >(['author-reviews', review.book.authorBooks[0].author.id], old => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                data: page.data.data.filter(
                  (r: ReviewType) => r.id !== review.id
                ),
              },
            })),
          };
        });

        // 작가 상세 정보의 리뷰 카운트 업데이트
        queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
          ['author', review.book.authorBooks[0].author.id],
          old => {
            if (!old) return old;
            return {
              ...old,
              data: {
                ...old.data,
                reviewCount: (old.data.reviewCount ?? 0) - 1,
              },
            };
          }
        );
      }

      // 책 상세 정보의 리뷰 카운트 업데이트
      queryClient.setQueryData<AxiosResponse<BookDetail>>(
        ['book', review.book.id],
        old => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              reviewCount: (old.data.reviewCount ?? 0) - 1,
            },
          };
        }
      );

      toast.success('리뷰가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <UserAvatar user={review.user} />
          <p className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </p>
          {isMyReview && (
            <div className="ml-auto p-0.5">
              <ReviewActions
                onEdit={() => setShowEditDialog(true)}
                onDelete={() => setShowDeleteAlert(true)}
              />
            </div>
          )}
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
            {isExpanded ? (
              <ReviewContent
                content={review.content}
                className="text-base leading-relaxed text-gray-800"
              />
            ) : (
              <div ref={contentRef} className="relative">
                <ReviewContent
                  content={review.content}
                  className="line-clamp-3 text-base leading-relaxed text-gray-800"
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
                className="group flex h-5 w-5 cursor-pointer items-center gap-0.5 text-xs text-gray-500 transition-colors hover:bg-transparent hover:text-gray-900"
                onClick={() => toggleLike()}
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
                onClick={handleReplyButtonClick}
                className="group flex h-5 w-5 cursor-pointer items-center gap-0.5 text-xs text-gray-500 transition-colors hover:bg-transparent hover:text-gray-900"
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
    </>
  );
}
