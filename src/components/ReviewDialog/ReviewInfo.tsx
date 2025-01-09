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
    <div className="flex flex-col gap-4">
      <DialogTitle>
        <p className="text-2xl font-bold">{review.title}</p>
      </DialogTitle>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img
            src={review.book.imageUrl ?? 'https://picsum.photos/200/300'}
            className="h-[40px] rounded-sm"
            alt={review.book.title}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{review.book.title}</p>
            <p className="text-xs text-gray-500">
              {review.book.authorBooks
                .map(authorBook => authorBook.author.nameInKor)
                .join(', ')}{' '}
              · {review.book.publisher} ·{' '}
              {review.book.publicationDate?.split('-')[0]}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{review.user.nickname[0]}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{review.user.nickname}</p>
        </div>

        <p className="text-gray-500">
          {format(new Date(review.createdAt), 'yyyy년 M월 d일 HH시 mm분')}
        </p>
      </div>

      <div className="whitespace-pre-wrap">{review.content}</div>

      <div className="flex gap-2">
        <Button className="rounded-full" variant="outline">
          <ThumbsUpIcon className="mr-1 h-4 w-4" />
          <span>{review.likeCount}</span>
        </Button>
        <Button className="rounded-full" variant="outline">
          <MessageSquareIcon className="mr-1 h-4 w-4" />
          <span>{review.commentCount}</span>
        </Button>
      </div>
    </div>
  );
}
