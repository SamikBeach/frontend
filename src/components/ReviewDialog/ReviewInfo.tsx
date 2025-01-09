import { Review } from '@/apis/review/types';
import { DialogTitle } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

interface Props {
  review: Review;
}

export default function ReviewInfo({ review }: Props) {
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
            <span>{format(new Date(review.createdAt), 'yyyy년 M월 d일')}</span>
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
          className="rounded-full hover:bg-gray-100"
          variant="outline"
          size="sm"
        >
          <ThumbsUpIcon className="mr-1.5 h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {review.likeCount}
          </span>
        </Button>
        <Button
          className="rounded-full hover:bg-gray-100"
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
