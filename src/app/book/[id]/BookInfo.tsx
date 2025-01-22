'use client';

import { bookApi } from '@/apis/book/book';
import BookImage from '@/components/BookImage/BookImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { LoginDialog } from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useBookQueryData } from '@/hooks/queries/useBookQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Edit3Icon } from 'lucide-react';
import { RefObject, Suspense, useState } from 'react';

interface Props {
  bookId: number;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

function BookInfoContent({ bookId, reviewListRef }: Props) {
  const currentUser = useCurrentUser();

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openWriteReviewDialog, setOpenWriteReviewDialog] = useState(false);

  const { updateBookLikeQueryData } = useBookQueryData();

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => bookApi.toggleBookLike(book.id),
    onMutate: () => {
      updateBookLikeQueryData({ bookId: book.id, isOptimistic: true });
    },
    onError: () => {
      updateBookLikeQueryData({
        bookId: book.id,
        isOptimistic: false,
        currentStatus: {
          isLiked: book.isLiked,
          likeCount: book.likeCount,
        },
      });
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    toggleLike();
  };

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWriteReviewClick = () => {
    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    setOpenWriteReviewDialog(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-6">
          <BookImage
            imageUrl={book.imageUrl}
            title={book.title}
            width={200}
            height={300}
            className="flex-shrink-0 cursor-pointer rounded-lg"
            onClick={() =>
              window.open(
                `https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${book.isbn}`,
                '_blank'
              )
            }
          />
          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold">{book.title}</h1>
              <p className="text-gray-500">
                {book.authorBooks
                  .map(authorBook => authorBook.author.nameInKor)
                  .join(', ')}
              </p>
              {book.bookOriginalWorks.length > 0 && (
                <p className="text-gray-500">
                  원작: {book.bookOriginalWorks[0].originalWork.title}
                </p>
              )}
              {book.genre && (
                <p className="text-gray-500">장르: {book.genre.name}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">
                도서 정보 제공: 알라딘
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

              <Button variant="outline" onClick={handleWriteReviewClick}>
                <Edit3Icon className="mr-1 h-4 w-4" />
                리뷰 쓰기
              </Button>
            </div>
          </div>
        </div>
      </div>
      <WriteReviewDialog
        bookId={book.id}
        open={openWriteReviewDialog}
        onOpenChange={setOpenWriteReviewDialog}
      />
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function BookInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6">
        <Skeleton className="h-[300px] w-[200px]" />
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <div className="flex w-full justify-between pr-6">
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
