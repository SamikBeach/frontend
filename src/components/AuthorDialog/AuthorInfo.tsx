import { authorApi } from '@/apis/author/author';
import { AuthorDetail } from '@/apis/author/types';
import { PaginatedResponse } from '@/apis/common/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { RefObject } from 'react';
import { Button } from '../ui/button';

interface Props {
  author: AuthorDetail;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

export default function AuthorInfo({ author, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => authorApi.toggleAuthorLike(author.id),
    onMutate: () => {
      // 작가 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<AuthorDetail>>>
      >(
        {
          queryKey: ['authors'],
          exact: false,
        },
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                data: page.data.data.map((item: AuthorDetail) =>
                  item.id === author.id
                    ? {
                        ...item,
                        isLiked: !item.isLiked,
                        likeCount: item.isLiked
                          ? item.likeCount - 1
                          : item.likeCount + 1,
                      }
                    : item
                ),
              },
            })),
          };
        }
      );

      // 단일 작가 쿼리 데이터 업데이트
      queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
        ['author', author.id],
        oldData => {
          if (!oldData) return oldData;
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
      );
    },
    onError: () => {
      // 작가 목록 쿼리 데이터 원상 복구
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<AuthorDetail>>>
      >(
        {
          queryKey: ['authors'],
          exact: false,
        },
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                data: page.data.data.map((item: AuthorDetail) =>
                  item.id === author.id
                    ? {
                        ...item,
                        isLiked: author.isLiked,
                        likeCount: author.likeCount,
                      }
                    : item
                ),
              },
            })),
          };
        }
      );

      // 단일 작가 쿼리 데이터 원상 복구
      queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
        ['author', author.id],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: author.isLiked,
              likeCount: author.likeCount,
            },
          };
        }
      );
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    toggleLike();
  };

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[140px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src={author.imageUrl || 'https://picsum.photos/140/140'}
            alt={author.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={140}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle>
              <p className="text-2xl font-bold">{author.nameInKor}</p>
            </DialogTitle>
            <p className="text-gray-500">{author.name}</p>
          </div>

          <div className="flex w-full">
            <div className="flex gap-2">
              <Button
                className="rounded-full"
                variant="outline"
                onClick={handleLikeClick}
              >
                <ThumbsUpIcon
                  className={`h-4 w-4 ${author.isLiked ? 'fill-current' : ''}`}
                />
                <span>{author.likeCount}</span>
              </Button>
              <Button
                className="rounded-full"
                variant="outline"
                onClick={handleReviewClick}
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>{author.reviewCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
