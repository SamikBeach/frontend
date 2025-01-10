'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Edit3Icon } from 'lucide-react';
import { CommentButton } from '../CommentButton';
import { LikeButton } from '../LikeButton';

interface Props {
  book: BookDetail;
  reviewListRef: React.RefObject<HTMLDivElement | null>;
}

export default function BookInfo({ book, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
      // 책 목록 쿼리 데이터 업데이트
      // 무한 스크롤로 불러온 모든 페이지의 책 데이터를 순회하면서
      // 좋아요를 누른 책의 isLiked 상태와 좋아요 수를 즉시 변경
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<BookDetail>>>
      >(
        {
          queryKey: ['books'],
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
                data: page.data.data.map((item: BookDetail) =>
                  item.id === book.id
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

      // 단일 책 쿼리 데이터 업데이트
      // 책 상세 페이지에서 보여지는 단일 책의
      // isLiked 상태와 좋아요 수를 즉시 변경하여 UI를 업데이트
      queryClient.setQueryData<AxiosResponse<BookDetail>>(
        ['book', book.id],
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
      // 책 목록 쿼리 데이터 원상 복구
      // API 호출이 실패한 경우, 낙관적으로 업데이트했던 책 목록의
      // 좋아요 상태를 이전 상태로 되돌림
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<BookDetail>>>
      >(
        {
          queryKey: ['books'],
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
                data: page.data.data.map((item: BookDetail) =>
                  item.id === book.id
                    ? {
                        ...item,
                        isLiked: book.isLiked,
                        likeCount: book.likeCount,
                      }
                    : item
                ),
              },
            })),
          };
        }
      );

      // 단일 책 쿼리 데이터 원상 복구
      // API 호출이 실패한 경우, 낙관적으로 업데이트했던 단일 책의
      // 좋아요 상태를 이전 상태로 되돌림
      queryClient.setQueryData<AxiosResponse<BookDetail>>(
        ['book', book.id],
        oldData => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: book.isLiked,
              likeCount: book.likeCount,
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
            'group relative h-[210px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200'
          }
        >
          <img
            src={book.imageUrl ?? 'https://picsum.photos/140/210'}
            alt={book.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={210}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle>
              <p className="text-2xl font-bold">{book.title}</p>
            </DialogTitle>
            <p className="text-gray-500">
              {book.authorBooks
                .map(authorBook => authorBook.author.nameInKor)
                .join(', ')}{' '}
              · {book.publisher} · {book.publicationDate?.split('-')[0]}
            </p>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <LikeButton
                isLiked={book.isLiked ?? false}
                likeCount={book.likeCount}
                onClick={handleLikeClick}
              />
              <CommentButton
                commentCount={book.reviewCount}
                onClick={handleReviewClick}
              />
            </div>

            <WriteReviewDialog>
              <WriteReviewDialog.Trigger asChild>
                <Button variant="outline">
                  <Edit3Icon className="mr-1" />
                  리뷰 쓰기
                </Button>
              </WriteReviewDialog.Trigger>
            </WriteReviewDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
