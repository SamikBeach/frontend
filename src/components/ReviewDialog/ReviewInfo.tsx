import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { CommentButton } from '../CommentButton';
import { LikeButton } from '../LikeButton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  review: Review;
  commentListRef: React.RefObject<HTMLDivElement | null>;
}

export default function ReviewInfo({ review, commentListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      // 리뷰 목록 쿼리 데이터 업데이트
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >(
        {
          queryKey: ['reviews'],
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
                data: page.data.data.map((review: Review) =>
                  review.id === review.id
                    ? {
                        ...review,
                        isLiked: !review.isLiked,
                        likeCount: review.isLiked
                          ? review.likeCount - 1
                          : review.likeCount + 1,
                      }
                    : review
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 업데이트
      queryClient.setQueryData<AxiosResponse<Review>>(
        ['review', review.id],
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
      // 리뷰 목록 쿼리 데이터 원상 복구
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >(
        {
          queryKey: ['reviews'],
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
                data: page.data.data.map((review: Review) =>
                  review.id === review.id
                    ? {
                        ...review,
                        isLiked: review.isLiked,
                        likeCount: review.likeCount,
                      }
                    : review
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 원상 복구
      queryClient.setQueryData<AxiosResponse<Review>>(
        ['review', review.id],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: review.isLiked,
              likeCount: review.likeCount,
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

  const handleCommentClick = () => {
    commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-col gap-1">
          <DialogTitle asChild>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {review.title}
            </h1>
          </DialogTitle>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{review.user.nickname[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-700">
                {review.user.nickname}
              </span>
            </div>
            <span className="text-gray-300">·</span>
            <span>
              {format(new Date(review.createdAt), 'yyyy년 M월 d일 HH시 mm분')}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5">
          <img
            src={review.book.imageUrl ?? 'https://picsum.photos/200/300'}
            className="h-14 w-10 rounded-sm object-cover shadow-sm"
            alt={review.book.title}
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-gray-900">
              {review.book.title}
            </span>
            <span className="text-[11px] text-gray-500">
              {review.book.authorBooks
                .map(authorBook => authorBook.author.nameInKor)
                .join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 whitespace-pre-wrap text-base leading-relaxed text-gray-800">
        {review.content}
      </div>

      <div className="flex justify-center gap-2">
        <LikeButton
          isLiked={review.isLiked ?? false}
          likeCount={review.likeCount}
          onClick={handleLikeClick}
        />
        <CommentButton
          commentCount={review.commentCount}
          onClick={handleCommentClick}
        />
      </div>
    </div>
  );
}
