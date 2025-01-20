import { AuthorDetail } from '@/apis/author/types';
import { PaginatedResponse } from '@/apis/common/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UpdateLikeParams {
  authorId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

export function useAuthorQueryData() {
  const queryClient = useQueryClient();

  function updateAuthorLike({
    authorId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    // 작가 목록 쿼리 데이터 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<AuthorDetail>>>
    >(
      {
        queryKey: ['authors'],
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
              data: page.data.data.map(function updateItem(item: AuthorDetail) {
                if (item.id !== authorId) return item;
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

    // 단일 작가 쿼리 데이터 업데이트
    queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
      ['author', authorId],
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

  return { updateAuthorLike };
}
