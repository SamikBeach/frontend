import { Review as ReviewType } from '@/apis/review/types';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatDate } from '@/utils/date';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { UserAvatar } from '../UserAvatar';
import CommentList from './CommentList';

const MAX_CONTENT_LENGTH = 300;

interface Props {
  review: ReviewType;
  hideActions?: boolean;
  showBookInfo?: boolean;
}

export default function Review({
  review,
  hideActions = false,
  showBookInfo = false,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowMore = review.content.length > MAX_CONTENT_LENGTH;
  const bookDialog = useDialogQuery({ type: 'book' });
  const reviewDialog = useDialogQuery({ type: 'review' });

  const displayContent =
    shouldShowMore && !isExpanded
      ? review.content.slice(0, MAX_CONTENT_LENGTH)
      : review.content;

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <UserAvatar user={review.user} />
          <p className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <h3
            onClick={() => reviewDialog.open(review.id)}
            className="cursor-pointer text-lg font-medium hover:underline"
          >
            {review.title}
          </h3>
          {showBookInfo && (
            <span
              onClick={() => bookDialog.open(review.book.id)}
              className="cursor-pointer text-sm font-medium hover:underline"
            >
              {review.book.title}
            </span>
          )}
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
        {!hideActions && (
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
        )}
      </div>
      {!hideActions && <CommentList />}
    </>
  );
}
