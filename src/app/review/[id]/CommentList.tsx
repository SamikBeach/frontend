'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import { CommentItemSkeleton } from '@/components/CommentItem/CommentSkeleton';
import { UserAvatar } from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { commentItemAnimation } from '@/constants/animations';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate } from '@/utils/date';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef, Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  reviewId: number;
  scrollableTarget: string;
  onReply: (user: { nickname: string }) => void;
}

function CommentListContent({ reviewId, scrollableTarget, onReply }: Props) {
  const currentUser = useCurrentUser();

  const { data: review } = useSuspenseQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReviewDetail(reviewId),
    select: response => response.data,
  });

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<Comment>>,
    Error
  >({
    queryKey: ['comments', reviewId],
    queryFn: ({ pageParam = 1 }) => {
      return reviewApi.searchComments(reviewId, {
        page: pageParam as number,
        limit: 20,
      });
    },
    initialPageParam: 1,
    getNextPageParam: param => {
      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find(q => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
  });

  const comments = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (comments.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center text-sm text-gray-500">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-gray-900">댓글</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {review.commentCount}
        </span>
      </div>
      <InfiniteScroll
        dataLength={comments.length}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div className="py-2">
            <CommentItemSkeleton />
          </div>
        }
        scrollableTarget={scrollableTarget}
      >
        <AnimatePresence initial={false}>
          <div className="flex flex-col">
            {comments.map(comment => (
              <motion.div
                key={comment.id}
                layout="position"
                {...commentItemAnimation}
              >
                <CommentItem
                  comment={comment}
                  currentUser={currentUser}
                  onReply={onReply}
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </InfiniteScroll>
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
  currentUser: ReturnType<typeof useCurrentUser>;
  onReply: Props['onReply'];
}

function CommentItem({ comment, currentUser, onReply }: CommentItemProps) {
  const isMyComment = currentUser?.id === comment.user.id;

  return (
    <div className="flex gap-2">
      <UserAvatar user={comment.user} size="sm" />
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.user.nickname}</span>
          <span className="text-xs text-gray-500">
            {formatDate(comment.createdAt)}
          </span>
          {!isMyComment && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-gray-500"
              onClick={() => onReply(comment.user)}
            >
              답글
            </Button>
          )}
        </div>
        <p className="whitespace-pre-wrap text-sm text-gray-800">
          {comment.content}
        </p>
      </div>
    </div>
  );
}

function CommentListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

const CommentList = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <Suspense fallback={<CommentListSkeleton />}>
      <div ref={ref}>
        <CommentListContent {...props} />
      </div>
    </Suspense>
  );
});

CommentList.displayName = 'CommentList';

export default CommentList;
