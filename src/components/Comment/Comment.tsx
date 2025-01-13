import { Comment as CommentType } from '@/apis/review/types';
import { formatDate } from '@/utils/date';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { UserAvatar } from '../UserAvatar';

interface Props {
  content: string;
  user: CommentType['user'];
  likeCount: number;
  isLiked?: boolean;
  createdAt: string;
}

export default function Comment({
  content,
  user,
  likeCount,
  isLiked,
  createdAt,
}: Props) {
  return (
    <div className="flex items-start gap-3 py-1">
      <UserAvatar user={user} size="sm" />
      <div className="flex w-full flex-col gap-1.5">
        <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
        <div className="flex flex-col gap-1">
          <div className="w-full rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-700">
            {content}
          </div>

          <div className="flex justify-between px-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Button
                variant="ghost"
                className="h-5 px-0 text-xs font-medium hover:bg-transparent hover:text-gray-900"
              >
                좋아요
              </Button>
              <span className="text-gray-300">·</span>
              <Button
                variant="ghost"
                className="h-5 px-0 text-xs font-medium hover:bg-transparent hover:text-gray-900"
              >
                답글 달기
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <ThumbsUpIcon
                  className={`h-3.5 w-3.5 ${
                    isLiked
                      ? 'fill-blue-500 stroke-blue-500'
                      : 'stroke-gray-500'
                  }`}
                />
                <span>{likeCount}</span>
              </div>
              <div className="flex cursor-pointer items-center gap-1">
                <MessageSquareIcon className="h-3.5 w-3.5 stroke-gray-500" />
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
