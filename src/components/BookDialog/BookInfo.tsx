'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Edit3Icon } from 'lucide-react';
import { RefObject, Suspense } from 'react';

interface Props {
  bookId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function BookInfoContent({ bookId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();
  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
      // 책 목록 쿼리 데이터 업데이트
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
        <div className="group relative h-[210px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200">
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
            <DialogTitle className="text-2xl font-bold">
              {book.title}
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

            <WriteReviewDialog bookId={book.id}>
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

function BookInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton className="h-[210px] w-[140px] shrink-0 rounded-lg" />
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookInfo(props: Props) {
  return (
    <Suspense fallback={<BookInfoSkeleton />}>
      <BookInfoContent {...props} />
    </Suspense>
  );
}
