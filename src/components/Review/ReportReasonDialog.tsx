import { ReportReason, reviewApi } from '@/apis/review/review';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';

const REPORT_REASONS: Array<{
  text: string;
  value: ReportReason;
  icon: string;
}> = [
  { text: '부적절한 내용', value: 'INAPPROPRIATE', icon: '⚠️' },
  { text: '스팸', value: 'SPAM', icon: '🚫' },
  { text: '저작권 침해', value: 'COPYRIGHT', icon: '📄' },
  { text: '혐오 발언', value: 'HATE_SPEECH', icon: '💬' },
  { text: '기타', value: 'OTHER', icon: '⋯' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: number;
}

export function ReportReasonDialog({ open, onOpenChange, reviewId }: Props) {
  const { mutate: reportReview } = useMutation({
    mutationFn: (reason: ReportReason) =>
      reviewApi.reportReview(reviewId, { reason }),
    onSuccess: () => {
      toast.success('신고가 접수되었습니다.');
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>신고 사유 선택</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {REPORT_REASONS.map(reason => (
            <Button
              key={reason.value}
              variant="outline"
              className="justify-start gap-2 text-left"
              onClick={() => reportReview(reason.value)}
            >
              <span>{reason.icon}</span>
              {reason.text}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
