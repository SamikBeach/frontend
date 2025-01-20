import { PaginatedResponse } from '@/apis/common/types';
import { Review } from '@/apis/review/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UpdateLikeParams {
  reviewId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

export function useReviewQueryData() {
  const queryClient = useQueryClient();

  function updateReviewLike({
    reviewId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    // 리뷰 목록 쿼리 데이터 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >(
      {
        queryKey: ['reviews'],
        exact: false,
      },
      function updateListData(oldData) {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map(function updateItem(review: Review) {
                if (review.id !== reviewId) return review;
                return {
                  ...review,
                  isLiked: isOptimistic
                    ? !review.isLiked
                    : (currentStatus?.isLiked ?? review.isLiked),
                  likeCount: isOptimistic
                    ? review.isLiked
                      ? review.likeCount - 1
                      : review.likeCount + 1
                    : (currentStatus?.likeCount ?? review.likeCount),
                };
              }),
            },
          })),
        };
      }
    );

    // 단일 리뷰 쿼리 데이터 업데이트
    queryClient.setQueryData<AxiosResponse<Review>>(
      ['review', reviewId],
      function updateDetailData(oldData) {
        if (!oldData) return oldData;

        if (isOptimistic) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: !oldData.data.isLiked,
              likeCount: oldData.data.isLiked
                ? oldData.data.likeCount - 1
                : oldData.data.likeCount + 1,
            },
          };
        }

        // Rollback case
        return {
          ...oldData,
          data: {
            ...oldData.data,
            isLiked: currentStatus?.isLiked ?? oldData.data.isLiked,
            likeCount: currentStatus?.likeCount ?? oldData.data.likeCount,
          },
        };
      }
    );
  }

  return { updateReviewLike };
}
