'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { Edit3Icon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  book: BookDetail;
  reviewListRef: React.RefObject<HTMLDivElement | null>;
}

export default function BookInfo({ book, reviewListRef }: Props) {
  const [isLiked, setIsLiked] = useState(book.isLiked);
  const [likeCount, setLikeCount] = useState(book.likeCount);
  const currentUser = useCurrentUser();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    },
    onError: () => {
      setIsLiked(book.isLiked);
      setLikeCount(book.likeCount);
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
              <Button
                className={`rounded-full ${
                  isLiked
                    ? 'border-gray-700 bg-gray-700 text-white hover:border-gray-900 hover:bg-gray-900'
                    : ''
                }`}
                variant="outline"
                onClick={handleLikeClick}
              >
                <ThumbsUpIcon
                  className={`h-4 w-4 ${isLiked ? 'text-white' : ''}`}
                />
                <span>{likeCount}</span>
              </Button>
              <Button
                className="rounded-full"
                variant="outline"
                onClick={handleReviewClick}
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>{book.reviewCount}</span>
              </Button>
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
