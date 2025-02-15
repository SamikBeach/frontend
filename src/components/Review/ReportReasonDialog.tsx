import { ReportReason, reviewApi } from '@/apis/review/review';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';

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
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);

  const { mutate: reportReview } = useMutation({
    mutationFn: (reason: ReportReason) =>
      reviewApi.reportReview(reviewId, { reason }),
    onSuccess: () => {
      toast.success('신고가 접수되었습니다.');
      onOpenChange(false);
    },
    onError: error => {
      if (error instanceof AxiosError && error.response?.status === 409) {
        onOpenChange(false);
        setShowDuplicateAlert(true);
      } else {
        toast.error('신고 접수에 실패했습니다.');
        onOpenChange(false);
      }
    },
  });

  return (
    <>
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

      <AlertDialog
        open={showDuplicateAlert}
        onOpenChange={setShowDuplicateAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>이미 신고한 리뷰입니다</AlertDialogTitle>
            <AlertDialogDescription>
              동일한 리뷰에 대해 중복 신고는 불가능합니다.
              <br />
              신고 처리 결과는 별도로 안내드리겠습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
