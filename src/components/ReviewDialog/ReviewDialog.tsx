import { reviewApi } from '@/apis/review/review';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { CommentEditor } from '../CommentEditor';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

interface Props extends DialogProps {
  reviewId: number;
}

export default function ReviewDialog({ reviewId, children, ...props }: Props) {
  const { data: review, isLoading } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReviewDetail(reviewId),
    select: data => data.data,
    enabled: props.open,
  });
  console.log({ review });

  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="fixed left-1/2 top-1/2 flex h-[94vh] w-[900px] min-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {isLoading ? (
          <>
            <div>Loading...</div>
            <DialogTitle />
          </>
        ) : review ? (
          <>
            <ReviewInfo review={review} />
            <CommentList
              reviewId={reviewId}
              commentCount={review.commentCount}
            />
            <div className="fixed bottom-0 left-1/2 w-[820px] -translate-x-1/2 bg-white pb-10 pt-4">
              <div className="relative">
                <div className="absolute -bottom-10 -left-10 -right-10 -top-4 bg-white shadow-[0_-8px_12px_0px_white]" />
                <div className="relative">
                  <CommentEditor />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

ReviewDialog.Trigger = DialogTrigger;
