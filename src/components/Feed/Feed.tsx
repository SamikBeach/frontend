'use client';

import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { User } from '@/apis/user/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatDate } from '@/utils/date';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { MoreHorizontal, PencilIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { CommentButton } from '../CommentButton';
import { LikeButton } from '../LikeButton';
import DeleteReviewDialog from '../ReviewDialog/DeleteReviewDialog';
import { Button } from '../ui/button';
import { toast } from '../ui/sonner';
import { UserAvatar } from '../UserAvatar';
import EditDropdownMenu from './EditDropdownMenu';

interface FeedProps {
  review: Review;
  user: User;
  book: Book;
}

function Feed({ review, user, book }: FeedProps) {
  const { open } = useDialogQuery({ type: 'review' });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const isMyFeed = currentUser?.id === user.id;

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      // 리뷰 목록 쿼리 데이터 업데이트
      // 무한 스크롤로 불러온 모든 페이지의 리뷰 데이터를 순회하면서
      // 좋아요를 누른 리뷰의 isLiked 상태와 좋아요 수를 즉시 변경
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
                data: page.data.data.map(r =>
                  r.id === review.id
                    ? {
                        ...r,
                        isLiked: !r.isLiked,
                        likeCount: r.isLiked
                          ? r.likeCount - 1
                          : r.likeCount + 1,
                      }
                    : r
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 업데이트
      // 리뷰 상세 페이지에서 보여지는 단일 리뷰의
      // isLiked 상태와 좋아요 수를 즉시 변경하여 UI를 업데이트
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
      // API 호출이 실패한 경우, 낙관적으로 업데이트했던 리뷰 목록의
      // 좋아요 상태를 이전 상태로 되돌림
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
                data: page.data.data.map(r =>
                  r.id === review.id
                    ? {
                        ...r,
                        isLiked: review.isLiked,
                        likeCount: review.likeCount,
                      }
                    : r
                ),
              },
            })),
          };
        }
      );

      // 단일 리뷰 쿼리 데이터 원상 복구
      // API 호출이 실패한 경우, 낙관적으로 업데이트했던 단일 리뷰의
      // 좋아요 상태를 이전 상태로 되돌림
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

  const { mutate: deleteReview } = useMutation({
    mutationFn: () => reviewApi.deleteReview(review.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
      toast.success('리뷰가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('리뷰 삭제에 실패했습니다.');
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    toggleLike();
  };

  return (
    <>
      <div
        className="relative mb-4 flex max-w-[800px] gap-4 rounded-lg p-4 transition-colors hover:cursor-pointer hover:bg-gray-100"
        onClick={() => open(review.id)}
      >
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-2">
            <UserAvatar user={user} />
            <div className="text-muted-foreground">
              {formatDate(review.createdAt)}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="relative h-[300px] w-[200px] overflow-hidden rounded-lg bg-gray-200 shadow-sm">
                <img
                  src={book.imageUrl ?? 'https://picsum.photos/200/300'}
                  alt={book.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  width={200}
                  height={300}
                />
              </div>
              <div className="mt-2 max-w-[200px]">
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-500">
                  {book.authorBooks
                    .map(author => author.author.nameInKor)
                    .join(', ')}{' '}
                  · {book.publisher} · {book.publicationDate?.split('-')[0]}
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="mb-2 text-lg font-semibold leading-snug">
                  {review.title}
                </p>
                <p className="line-clamp-6 text-gray-600">{review.content}</p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <LikeButton
                  isLiked={review.isLiked ?? false}
                  likeCount={review.likeCount}
                  onClick={handleLikeClick}
                />
                <CommentButton commentCount={review.commentCount} />
              </div>
            </div>
          </div>
        </div>

        {isMyFeed && (
          <div className="absolute right-4 top-4">
            <EditDropdownMenu>
              <EditDropdownMenu.Trigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </Button>
              </EditDropdownMenu.Trigger>
              <EditDropdownMenu.Content>
                <EditDropdownMenu.Item
                  onClick={() => {}}
                  className="cursor-pointer"
                >
                  <PencilIcon className="h-4 w-4" />
                  수정하기
                </EditDropdownMenu.Item>
                <EditDropdownMenu.Item
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setShowDeleteAlert(true);
                  }}
                  className="cursor-pointer text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  삭제하기
                </EditDropdownMenu.Item>
              </EditDropdownMenu.Content>
            </EditDropdownMenu>
          </div>
        )}
      </div>
      <DeleteReviewDialog
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        onConfirm={() => {
          deleteReview();
          setShowDeleteAlert(false);
        }}
      />
    </>
  );
}

export default Feed;
