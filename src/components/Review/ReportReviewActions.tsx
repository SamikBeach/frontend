'use client';

import { userApi } from '@/apis/user/user';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { Flag, MoreHorizontal, UserX } from 'lucide-react';
import { useState } from 'react';
import { ReportReasonDialog } from './ReportReasonDialog';

interface Props {
  reviewId: number;
  userId: number;
  userNickname: string;
}

export default function ReportReviewActions({
  reviewId,
  userId,
  userNickname,
}: Props) {
  const [open, setOpen] = useState(false);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const { mutate: blockUser } = useMutation({
    mutationFn: () => userApi.blockUser(userId),
    onSuccess: () => {
      toast.success('사용자를 차단했습니다.');
    },
  });

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" aria-label="더보기">
            <MoreHorizontal className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setOpen(false);
              setShowReportDialog(true);
            }}
            className="cursor-pointer"
          >
            <Flag className="h-4 w-4" />
            리뷰 신고하기
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              setOpen(false);
              setShowBlockDialog(true);
            }}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <UserX className="h-4 w-4" />
            {userNickname} 차단하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>사용자 차단</AlertDialogTitle>
            <AlertDialogDescription>
              {userNickname}님을 차단하시겠습니까?
              <br />
              차단한 사용자의 콘텐츠는 더 이상 표시되지 않습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                blockUser();
                setShowBlockDialog(false);
              }}
            >
              차단
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ReportReasonDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        reviewId={reviewId}
      />
    </>
  );
}
