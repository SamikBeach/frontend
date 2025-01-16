import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThumbsUpIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { toast } from 'sonner';
import { CommentContent } from '.';
import CommentEditor from '../CommentEditor/CommentEditor';
import { Button } from '../ui/button';
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
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const currentUser = useCurrentUser();
    const isMyComment = comment.user.id === currentUser?.id;

    const { mutate: toggleLike } = useMutation({
      mutationFn: () => reviewApi.toggleCommentLike(reviewId, comment.id),
      onMutate: () => {
        queryClient.setQueryData(['comments', reviewId], (old: any) => ({
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map((c: Comment) =>
                c.id === comment.id
                  ? {
                      ...c,
                      isLiked: !c.isLiked,
                      likeCount: c.likeCount + (c.isLiked ? -1 : 1),
                    }
                  : c
              ),
            },
          })),
        }));
      },
      onError: () => {
        queryClient.setQueryData(['comments', reviewId], (old: any) => ({
          ...old,
          data: {
            ...old.data,
            isLiked: comment.isLiked,
            likeCount: comment.likeCount,
          },
        }));
      },
    });

    const { mutate: deleteComment } = useMutation({
      mutationFn: () => reviewApi.deleteComment(reviewId, comment.id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', reviewId] });
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
          <div className="flex flex-col gap-1">
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
                  onClick={() => toggleLike()}
                  className={`h-5 px-0 text-xs hover:bg-transparent hover:text-gray-900 ${
                    comment.isLiked
                      ? 'font-bold text-gray-900'
                      : 'font-medium text-gray-600'
                  }`}
                >
                  좋아요
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => onReply({ nickname: comment.user.nickname })}
                  className="h-5 px-0 text-xs font-medium hover:bg-transparent hover:text-gray-900"
                >
                  답글 달기
                </Button>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <ThumbsUpIcon
                  className={`h-3.5 w-3.5 ${
                    comment.isLiked
                      ? 'fill-blue-500 stroke-blue-500'
                      : 'stroke-gray-500'
                  }`}
                />
                <span>{comment.likeCount}</span>
              </div>
            </div>
          </div>
        </div>

        <DeleteAlertDialog
          open={showDeleteAlert}
          onOpenChange={setShowDeleteAlert}
          onConfirm={() => deleteComment()}
        />
      </div>
    );
  }
);

CommentItem.displayName = 'CommentItem';

export default CommentItem;
