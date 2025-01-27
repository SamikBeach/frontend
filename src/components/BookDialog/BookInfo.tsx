'use client';

import { bookApi } from '@/apis/book/book';
import BookImage from '@/components/BookImage/BookImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { useBookQueryData } from '@/hooks/queries/useBookQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Edit3Icon } from 'lucide-react';
import { RefObject, Suspense, useState } from 'react';
import { LoginDialog } from '../LoginDialog';
import BookInfoSkeleton from './BookInfoSkeleton';

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

  const handleWriteReviewClick = () => {
    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    setOpenWriteReviewDialog(true);
  };

  const handleReviewClick = () => {
    reviewListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formattedPublicationDate = book.publicationDate
    ? format(new Date(book.publicationDate), 'yyyy년 M월 d일')
    : '';

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <BookImage
            imageUrl={book.imageUrl}
            title={book.title}
            width={140}
            height={200}
            className="flex-shrink-0 cursor-pointer rounded-lg"
            onClick={() =>
              window.open(
                `https://www.aladin.co.kr/shop/wproduct.aspx?isbn=${book.isbn}`,
                '_blank'
              )
            }
          />
          <div className="flex w-full flex-col justify-between">
            <div className="flex flex-col gap-0.5">
              <DialogTitle className="text-2xl font-bold">
                {book.title}
              </DialogTitle>
              <p>
                {book.authorBooks
                  .map(authorBook => authorBook.author.nameInKor)
                  .join(', ')}
              </p>
              <p className="text-gray-500">
                {book.publisher}
                {book.publisher && formattedPublicationDate && (
                  <span className="mx-1 font-medium">·</span>
                )}
                {formattedPublicationDate}
              </p>
              {book.bookOriginalWorks[0] && (
                <p className="text-gray-500">
                  원전 : {book.bookOriginalWorks[0].originalWork.title}(
                  {book.bookOriginalWorks[0].originalWork.titleInEng})
                </p>
              )}
              <p className="mt-1 text-xs text-gray-400">정보 제공: 알라딘</p>
            </div>

            <div className="mt-auto flex w-full justify-between">
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

              <Button
                variant="outline"
                className="gap-1.5 border-2 font-medium"
                onClick={handleWriteReviewClick}
              >
                <Edit3Icon className="h-4 w-4" />
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

export default function BookInfo(props: Props) {
  return (
    <Suspense fallback={<BookInfoSkeleton />}>
      <BookInfoContent {...props} />
    </Suspense>
  );
}
