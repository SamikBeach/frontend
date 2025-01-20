import { Comment } from '@/apis/review/types';
import { useQueryClient } from '@tanstack/react-query';

interface UpdateLikeParams {
  reviewId: number;
  commentId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

export function useCommentQueryData() {
  const queryClient = useQueryClient();

  function updateCommentLike({
    reviewId,
    commentId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    queryClient.setQueryData(
      ['comments', reviewId],
      function updateData(oldData: any) {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map(function updateItem(comment: Comment) {
                if (comment.id !== commentId) return comment;
                return {
                  ...comment,
                  isLiked: isOptimistic
                    ? !comment.isLiked
                    : (currentStatus?.isLiked ?? comment.isLiked),
                  likeCount: isOptimistic
                    ? comment.likeCount + (comment.isLiked ? -1 : 1)
                    : (currentStatus?.likeCount ?? comment.likeCount),
                };
              }),
            },
          })),
        };
      }
    );
  }

  return { updateCommentLike };
}
