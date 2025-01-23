import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThumbsUpIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { CommentContent } from '.';
import CommentEditor from '../CommentEditor/CommentEditor';
import { LoginDialog } from '../LoginDialog';
import { Button } from '../ui/button';
import { toast } from '../ui/sonner';
import { UserAvatar } from '../UserAvatar';
import CommentActions from './CommentActions';
import DeleteAlertDialog from './DeleteAlertDialog';

interface Props {
  comment: Comment;
  reviewId: number;
  onReply: (user: { nickname: string }) => void;
}

const CommentItem = forwardRef<HTMLDivElement, Props>(
  ({ comment, reviewId, onReply }, ref) => {
    const { updateCommentLikeQueryData, deleteCommentQueryData } =
      useCommentQueryData();
    const queryClient = useQueryClient();
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', reviewId] });
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
        <div ref={ref} className="flex flex-col items-start gap-2 py-1.5">
          <div className="flex w-full items-center justify-between gap-2">
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
            <div className="flex flex-col gap-0.5">
              <div
                className={`w-full rounded-lg ${isEditing ? '' : 'bg-gray-50'} p-3`}
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
                    className="text-sm leading-relaxed text-gray-700"
                  />
                )}
              </div>

              <div className="flex justify-between px-1">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Button
                    variant="ghost"
                    className="group flex h-5 w-5 cursor-pointer items-center gap-0.5 text-xs text-gray-500 transition-colors hover:bg-transparent hover:text-gray-900"
                    onClick={() => {
                      if (!currentUser) {
                        setOpenLoginDialog(true);

                        return;
                      }

                      toggleLike();
                    }}
                  >
                    <ThumbsUpIcon
                      className={`!h-3.5 !w-3.5 ${
                        comment.isLiked
                          ? 'fill-blue-500 stroke-blue-500'
                          : 'stroke-gray-500'
                      } transition-colors group-hover:stroke-gray-900`}
                    />
                    <span>{comment.likeCount}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => onReply({ nickname: comment.user.nickname })}
                    className="h-5 px-0 text-xs hover:bg-transparent hover:text-gray-900"
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
