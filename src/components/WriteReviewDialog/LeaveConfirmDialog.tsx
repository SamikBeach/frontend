'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { DialogProps } from '@radix-ui/react-dialog';

interface Props extends DialogProps {}

export default function LeaveConfirmDialog({ children, ...props }: Props) {
  return (
    <AlertDialog {...props}>
      {children}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 나가시겠어요?</AlertDialogTitle>
          <AlertDialogDescription>
            작성 중인 내용은 저장되지 않아요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>나가기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

LeaveConfirmDialog.Trigger = AlertDialogTrigger;
