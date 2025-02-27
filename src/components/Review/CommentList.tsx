import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import CommentItem from '@/components/CommentItem/CommentItem';
import { CommentItemSkeleton } from '@/components/CommentItem/CommentSkeleton';
import { Button } from '@/components/ui/button';
import { commentItemAnimation } from '@/constants/animations';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Suspense, useMemo } from 'react';

interface Props {
  reviewId: number;
  onReply: (user: { nickname: string }) => void;
}

function CommentListContent({ reviewId, onReply }: Props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<AxiosResponse<PaginatedResponse<Comment>>, Error>({
      queryKey: ['comments', reviewId],
      queryFn: ({ pageParam = 1 }) => {
        return reviewApi.searchComments(reviewId, {
          page: pageParam as number,
          limit: 5,
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

  return (
    <div className="flex flex-col gap-3">
      {comments.length > 0 && (
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            댓글 {comments.length}개
          </h3>
        </div>
      )}
      <AnimatePresence mode="popLayout" initial={false}>
        <div className="flex flex-col gap-2">
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              layout="position"
              {...commentItemAnimation}
              className="pb-2 last:pb-0"
            >
              <CommentItem
                comment={comment}
                reviewId={reviewId}
                onReply={onReply}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
      {hasNextPage && (
        <div className="mt-2 flex justify-center">
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            {isFetchingNextPage ? '불러오는 중...' : '댓글 더보기'}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function CommentList(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <CommentItemSkeleton />
            <CommentItemSkeleton />
          </div>
        </div>
      }
    >
      <CommentListContent {...props} />
    </Suspense>
  );
}
