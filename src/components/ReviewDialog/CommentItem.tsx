import { Comment } from '@/apis/review/types';
import { formatDate } from '@/utils/date';
import { CommentContent } from '../CommentContent';
import { UserAvatar } from '../UserAvatar';

interface Props {
  comment: Comment;
}

export default function CommentItem({ comment }: Props) {
  return (
    <div className="flex gap-3">
      <UserAvatar user={comment.user} size="sm" showNickname={false} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user.nickname}</span>
          <span className="text-sm text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <CommentContent
          content={comment.content}
          className="mt-1 text-sm text-gray-900"
        />
      </div>
    </div>
  );
}
