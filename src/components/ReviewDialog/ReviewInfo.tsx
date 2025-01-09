import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface Props {
  review: Review;
}

export default function ReviewInfo({ review }: Props) {
  const [isLiked, setIsLiked] = useState(review.isLiked);
  const [likeCount, setLikeCount] = useState(review.likeCount);
  const currentUser = useCurrentUser();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleReviewLike(review.id),
    onMutate: () => {
      setIsLiked(prev => !prev);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    },
    onError: () => {
      setIsLiked(review.isLiked);
      setLikeCount(review.likeCount);
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    toggleLike();
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
        <Button
          className={`min-w-[70px] rounded-full ${
            isLiked
              ? 'border-gray-700 bg-gray-700 text-white hover:border-gray-900 hover:bg-gray-900'
              : 'hover:bg-gray-100'
          }`}
          variant="outline"
          size="sm"
          onClick={handleLikeClick}
        >
          <ThumbsUpIcon
            className={`mr-1.5 h-4 w-4 ${isLiked ? 'text-white' : 'text-gray-600'}`}
          />
          <span
            className={`text-sm font-medium ${isLiked ? 'text-white' : 'text-gray-700'}`}
          >
            {likeCount}
          </span>
        </Button>
        <Button
          className="min-w-[70px] rounded-full hover:bg-gray-100"
          variant="outline"
          size="sm"
        >
          <MessageSquareIcon className="mr-1.5 h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {review.commentCount}
          </span>
        </Button>
      </div>
    </div>
  );
}
