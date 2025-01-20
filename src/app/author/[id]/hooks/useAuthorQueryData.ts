import { AuthorDetail } from '@/apis/author/types';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UpdateLikeParams {
  authorId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

export const useAuthorQueryData = () => {
  const queryClient = useQueryClient();

  const updateAuthorLike = ({
    authorId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) => {
    queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
      ['author', authorId],
      oldData => {
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
  };

  return { updateAuthorLike };
};
