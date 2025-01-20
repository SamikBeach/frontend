import { BookDetail } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UpdateLikeParams {
  bookId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

export function useBookQueryData() {
  const queryClient = useQueryClient();

  function updateBookLike({
    bookId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    // 책 목록 쿼리 데이터 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<BookDetail>>>
    >(
      {
        queryKey: ['books'],
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
              data: page.data.data.map(function updateItem(item: BookDetail) {
                if (item.id !== bookId) return item;
                return {
                  ...item,
                  isLiked: isOptimistic
                    ? !item.isLiked
                    : (currentStatus?.isLiked ?? item.isLiked),
                  likeCount: isOptimistic
                    ? item.isLiked
                      ? item.likeCount - 1
                      : item.likeCount + 1
                    : (currentStatus?.likeCount ?? item.likeCount),
                };
              }),
            },
          })),
        };
      }
    );

    // 단일 책 쿼리 데이터 업데이트
    queryClient.setQueryData<AxiosResponse<BookDetail>>(
      ['book', bookId],
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

  return { updateBookLike };
}
