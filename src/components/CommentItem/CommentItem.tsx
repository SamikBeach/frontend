import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/utils/common';
import { formatDate } from '@/utils/date';
import { useMutation } from '@tanstack/react-query';
import { ThumbsUpIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import { LoginDialog } from '../LoginDialog';
import { Button } from '../ui/button';
import { toast } from '../ui/sonner';
import { UserAvatar } from '../UserAvatar';
import CommentActions from './CommentActions';
import CommentContent from './CommentContent';
import DeleteAlertDialog from './DeleteAlertDialog';

interface Props {
  comment: Comment;
  reviewId: number;
  onReply: (user: { nickname: string }) => void;
}

const CommentItem = forwardRef<HTMLDivElement, Props>(
  ({ comment, reviewId, onReply }, ref) => {
    const {
      updateCommentLikeQueryData,
      deleteCommentQueryData,
      updateCommentQueryData,
    } = useCommentQueryData();

    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const currentUser = useCurrentUser();
    const isMyComment = comment.user.id === currentUser?.id;

    const { mutate: toggleLike } = useMutation({
      mutationFn: () => reviewApi.toggleCommentLike(reviewId, comment.id),
      onMutate: () => {
        updateCommentLikeQueryData({
          reviewId,
          commentId: comment.id,
          isOptimistic: true,
        });
      },
      onError: () => {
        updateCommentLikeQueryData({
          reviewId,
          commentId: comment.id,
          isOptimistic: false,
          currentStatus: {
            isLiked: comment.isLiked ?? false,
            likeCount: comment.likeCount,
          },
        });
      },
    });

    const { mutate: deleteComment } = useMutation({
      mutationFn: () => reviewApi.deleteComment(reviewId, comment.id),
      onSuccess: () => {
        deleteCommentQueryData({ reviewId, commentId: comment.id });
        toast.success('댓글이 삭제되었습니다.');
      },
      onError: () => {
        toast.error('댓글 삭제에 실패했습니다.');
      },
    });

    const { mutate: updateComment } = useMutation({
      mutationFn: (content: string) =>
        reviewApi.updateComment(reviewId, comment.id, { content }),
      onSuccess: (_, content) => {
        updateCommentQueryData({ reviewId, commentId: comment.id, content });
        setIsEditing(false);
        toast.success('댓글이 수정되었습니다.');
      },
      onError: () => {
        toast.error('댓글 수정에 실패했습니다.');
      },
    });

    const handleEditStart = () => {
      setIsEditing(true);
    };

    const handleEditCancel = () => {
      setIsEditing(false);
    };

    return (
      <>
        <div ref={ref} className="flex flex-col gap-2.5 py-1.5">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <UserAvatar user={comment.user} size="sm" />

              <span className="text-xs text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
            {isMyComment && (
              <CommentActions
                onEdit={handleEditStart}
                onDelete={() => setShowDeleteAlert(true)}
              />
            )}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <div className="flex flex-col">
              <div
                className={cn(
                  'w-full rounded-lg p-2.5',
                  isEditing ? 'bg-white' : 'bg-gray-50'
                )}
              >
                {isEditing ? (
                  <CommentEditor
                    initialContent={comment.content}
                    onSubmit={updateComment}
                    onCancel={handleEditCancel}
                    showAvatar={false}
                  />
                ) : (
                  <CommentContent
                    content={comment.content}
                    className="text-sm leading-relaxed text-gray-800"
                  />
                )}
              </div>

              <div className="mt-0.5 flex justify-between">
                <div className="inline-flex items-center gap-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      'group flex h-6 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100',
                      {
                        'bg-blue-50 text-blue-600 hover:bg-blue-100':
                          comment.isLiked,
                      }
                    )}
                    onClick={() => {
                      if (!currentUser) {
                        setOpenLoginDialog(true);
                        return;
                      }

                      toggleLike();
                    }}
                  >
                    <ThumbsUpIcon
                      className={cn('mr-0.5 h-3 w-3', {
                        'fill-blue-500 stroke-blue-500': comment.isLiked,
                        'stroke-gray-600': !comment.isLiked,
                      })}
                    />
                    <span>
                      {comment.likeCount > 0 ? comment.likeCount : '좋아요'}
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => onReply({ nickname: comment.user.nickname })}
                    className="h-6 rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  >
                    답글 달기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DeleteAlertDialog
          open={showDeleteAlert}
          onOpenChange={setShowDeleteAlert}
          onConfirm={() => deleteComment()}
        />
        <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
      </>
    );
  }
);

CommentItem.displayName = 'CommentItem';

export default CommentItem;
