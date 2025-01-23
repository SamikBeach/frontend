import { PaginatedResponse } from '@/apis/common/types';
import { Comment, Review } from '@/apis/review/types';
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

interface DeleteCommentParams {
  reviewId: number;
  commentId: number;
}

interface UpdateCommentParams {
  reviewId: number;
  commentId: number;
  content: string;
}

interface CreateCommentParams {
  reviewId: number;
  comment: Comment;
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

  function deleteCommentQueryData({
    reviewId,
    commentId,
  }: DeleteCommentParams) {
    // Update comment list
    queryClient.setQueryData<
      InfiniteData<AxiosResponse<PaginatedResponse<Comment>>>
    >(['comments', reviewId], commentListData => {
      if (!commentListData) return commentListData;
      return {
        ...commentListData,
        pages: commentListData.pages.map(commentPage => ({
          ...commentPage,
          data: {
            ...commentPage.data,
            data: commentPage.data.data.filter(
              comment => comment.id !== commentId
            ),
          },
        })),
      };
    });

    // Update review comment count
    queryClient.setQueryData<AxiosResponse<Review>>(
      ['review', reviewId],
      reviewData => {
        if (!reviewData) return reviewData;
        return {
          ...reviewData,
          data: {
            ...reviewData.data,
            commentCount: reviewData.data.commentCount - 1,
          },
        };
      }
    );
  }

  function updateCommentQueryData({
    reviewId,
    commentId,
    content,
  }: UpdateCommentParams) {
    queryClient.setQueryData<
      InfiniteData<AxiosResponse<PaginatedResponse<Comment>>>
    >(['comments', reviewId], commentListData => {
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
                content,
              };
            }),
          },
        })),
      };
    });
  }

  function createCommentQueryData({ reviewId, comment }: CreateCommentParams) {
    // Update comment list
    queryClient.setQueryData<
      InfiniteData<AxiosResponse<PaginatedResponse<Comment>>>
    >(['comments', reviewId], commentListData => {
      if (!commentListData) return commentListData;
      return {
        ...commentListData,
        pages: commentListData.pages.map((commentPage, index) => {
          // Add new comment to the first page
          if (index === 0) {
            return {
              ...commentPage,
              data: {
                ...commentPage.data,
                data: [comment, ...commentPage.data.data],
              },
            };
          }
          return commentPage;
        }),
      };
    });

    // Update review comment count
    queryClient.setQueryData<AxiosResponse<Review>>(
      ['review', reviewId],
      reviewData => {
        if (!reviewData) return reviewData;
        return {
          ...reviewData,
          data: {
            ...reviewData.data,
            commentCount: reviewData.data.commentCount + 1,
          },
        };
      }
    );
  }

  return {
    updateCommentLikeQueryData,
    deleteCommentQueryData,
    updateCommentQueryData,
    createCommentQueryData,
  };
}
