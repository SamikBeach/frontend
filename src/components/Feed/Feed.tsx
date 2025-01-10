'use client';

import { Book } from '@/apis/book/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { User } from '@/apis/user/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/utils/date';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { CommentButton } from '../CommentButton';
import { LikeButton } from '../LikeButton';
import { ReviewDialog } from '../ReviewDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import EditDropdownMenu from './EditDropdownMenu';

interface FeedProps {
  review: Review;
  user: User;
  book: Book;
}

function Feed({ review, user, book }: FeedProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(review.isLiked ?? false);
  const [likeCount, setLikeCount] = useState(review.likeCount);
  const currentUser = useCurrentUser();
  const isMyFeed = currentUser?.id === user.id;

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    },
    onError: () => {
      setIsLiked(review.isLiked ?? false);
      setLikeCount(review.likeCount);
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
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{user.nickname[0]}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{user.nickname}</div>
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
                  isLiked={isLiked}
                  likeCount={likeCount}
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
            </EditDropdownMenu>
          </div>
        )}
      </div>
      <ReviewDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        reviewId={review.id}
      />
    </>
  );
}

export default Feed;
