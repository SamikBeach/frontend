import { Comment as CommentType } from '@/apis/review/types';
import { formatDate } from '@/utils/date';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';

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
    <div className="flex items-start gap-2">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="h-8 w-8 rounded-full"
        />
        <AvatarFallback>{user.nickname.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{user.nickname}</p>
          <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-full rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
            {content}
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
                <ThumbsUpIcon
                  className={`h-4 w-4 ${isLiked ? 'fill-blue-500 stroke-blue-500' : 'stroke-gray-500'}`}
                />
                <span>{likeCount}</span>
              </div>
              <div className="flex cursor-pointer items-center gap-0.5">
                <MessageSquareIcon className="mt-0.5 h-4 w-4 stroke-gray-500" />
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
