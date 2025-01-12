'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Edit3Icon } from 'lucide-react';
import { RefObject } from 'react';

interface Props {
  book: BookDetail;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

export default function BookInfo({ book, reviewListRef }: Props) {
  const currentUser = useCurrentUser();
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
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
      <div className="flex gap-6">
        <div
          className={
            'group relative h-[300px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200'
          }
        >
          <img
            src={book.imageUrl || 'https://picsum.photos/200/300'}
            alt={book.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={200}
            height={300}
          />
        </div>
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-gray-500">
              {book.authorBooks
                .map(authorBook => authorBook.author.nameInKor)
                .join(', ')}
            </p>
          </div>

          <div className="flex w-full justify-between pr-6">
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
                  <Edit3Icon className="mr-1 h-4 w-4" />
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
