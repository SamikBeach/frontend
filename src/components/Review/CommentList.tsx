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
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="popLayout" initial={false}>
        <div className="flex flex-col gap-2">
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              layout="position"
              {...commentItemAnimation}
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
        <Button
          variant="ghost"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-2 text-sm text-gray-500 hover:text-gray-900"
        >
          {isFetchingNextPage ? '불러오는 중...' : '답글 더보기'}
        </Button>
      )}
    </div>
  );
}

export default function CommentList(props: Props) {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-2">
          <CommentItemSkeleton />
          <CommentItemSkeleton />
          <CommentItemSkeleton />
        </div>
      }
    >
      <CommentListContent {...props} />
    </Suspense>
  );
}
