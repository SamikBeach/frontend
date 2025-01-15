import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import { formatDate } from '@/utils/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThumbsUpIcon } from 'lucide-react';
import { CommentContent } from '.';
import { Button } from '../ui/button';
import { UserAvatar } from '../UserAvatar';

interface Props {
  comment: Comment;
  reviewId: number;
  onReply: (user: { nickname: string }) => void;
}

export default function CommentItem({ comment, reviewId, onReply }: Props) {
  const queryClient = useQueryClient();

  const { mutate: toggleLike } = useMutation({
    mutationFn: () => reviewApi.toggleCommentLike(reviewId, comment.id),
    onMutate: () => {
      queryClient.setQueryData(['comments', reviewId], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.map((c: Comment) =>
              c.id === comment.id
                ? {
                    ...c,
                    isLiked: !c.isLiked,
                    likeCount: c.likeCount + (c.isLiked ? -1 : 1),
                  }
                : c
            ),
          },
        })),
      }));
    },
    onError: () => {
      queryClient.setQueryData(['comments', reviewId], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          isLiked: comment.isLiked,
          likeCount: comment.likeCount,
        },
      }));
    },
  });

  return (
    <div className="flex flex-col items-start gap-2 py-1.5">
      <div className="flex items-center gap-2">
        <UserAvatar user={comment.user} size="sm" />
        <span className="text-xs text-gray-500">
          {formatDate(comment.createdAt)}
        </span>
      </div>
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex flex-col gap-1">
          <div className="w-full rounded-lg bg-gray-50 p-3">
            <CommentContent
              content={comment.content}
              className="text-sm leading-relaxed text-gray-700"
            />
          </div>

          <div className="flex justify-between px-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Button
                variant="ghost"
                onClick={() => toggleLike()}
                className="h-5 px-0 text-xs font-medium hover:bg-transparent hover:text-gray-900"
              >
                좋아요
              </Button>
              <span className="text-gray-300">·</span>
              <Button
                variant="ghost"
                onClick={() => onReply({ nickname: comment.user.nickname })}
                className="h-5 px-0 text-xs font-medium hover:bg-transparent hover:text-gray-900"
              >
                답글 달기
              </Button>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <ThumbsUpIcon
                className={`h-3.5 w-3.5 ${
                  comment.isLiked
                    ? 'fill-blue-500 stroke-blue-500'
                    : 'stroke-gray-500'
                }`}
              />
              <span>{comment.likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
