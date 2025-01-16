import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Comment } from '@/apis/review/types';
import CommentItem from '@/components/CommentItem/CommentItem';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  reviewId: number;
  onReply: (user: { nickname: string }) => void;
}

const commentAnimation = {
  initial: { opacity: 0, height: 0, marginBottom: 0 },
  animate: { opacity: 1, height: 'auto', marginBottom: '0.5rem' },
  exit: { opacity: 0, height: 0, marginBottom: 0 },
  transition: { duration: 0.2 },
};

export default function CommentList({ reviewId, onReply }: Props) {
  const { data: comments = [] } = useQuery<
    AxiosResponse<PaginatedResponse<Comment>>,
    Error,
    Comment[]
  >({
    queryKey: ['comments', reviewId],
    queryFn: () => reviewApi.searchComments(reviewId, { limit: 5, page: 1 }),
    select: response => response.data.data,
  });

  return (
    <div className="mt-4">
      <AnimatePresence initial={false}>
        <div className="flex flex-col">
          {comments.map(comment => (
            <motion.div key={comment.id} layout {...commentAnimation}>
              <CommentItem
                comment={comment}
                reviewId={reviewId}
                onReply={onReply}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
