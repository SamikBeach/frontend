import { PaginatedResponse } from '@/apis/common/types';
import { Comment } from '@/apis/review/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

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

  function updateCommentLikeQueryData({
    reviewId,
    commentId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    queryClient.setQueryData<
      InfiniteData<AxiosResponse<PaginatedResponse<Comment>>>
    >(
      ['comments', reviewId],
      function updateCommentListQueryData(commentListData) {
        if (!commentListData) return commentListData;
        return {
          ...commentListData,
          pages: commentListData.pages.map(commentPage => ({
            ...commentPage,
            data: {
              ...commentPage.data,
              data: commentPage.data.data.map(comment => {
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

  return { updateCommentLikeQueryData };
}
