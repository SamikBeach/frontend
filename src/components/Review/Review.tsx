import { Review as ReviewType } from '@/apis/review/types';
import { formatDate } from '@/utils/date';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import CommentList from './CommentList';

const MAX_CONTENT_LENGTH = 300;

interface Props {
  review: ReviewType;
}

export default function Review({ review }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowMore = review.content.length > MAX_CONTENT_LENGTH;

  const displayContent =
    shouldShowMore && !isExpanded
      ? review.content.slice(0, MAX_CONTENT_LENGTH)
      : review.content;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{review.user.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="font-medium">{review.user.nickname}</p>
              <p className="text-sm text-gray-500">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full">
            {displayContent}
            {shouldShowMore && !isExpanded && (
              <Button
                variant="link"
                onClick={() => setIsExpanded(true)}
                className="h-[14px] p-0 text-sm text-gray-500"
              >
                ...더보기
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 text-gray-500">
            <Button
              variant="ghost"
              className="h-[14px] p-0 hover:bg-transparent"
            >
              좋아요
            </Button>
            <Button
              variant="ghost"
              className="h-[14px] p-0 hover:bg-transparent"
            >
              답글 달기
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-0.5">
              <ThumbsUpIcon className="h-4 w-4 stroke-gray-500" />
              <span>{review.likeCount}</span>
            </div>
            <div className="flex cursor-pointer items-center gap-0.5">
              <MessageSquareIcon className="mt-0.5 h-4 w-4 stroke-gray-500" />
              <span>{review.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
      <CommentList />
    </>
  );
}
