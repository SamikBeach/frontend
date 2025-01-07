'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import LeaveConfirmDialog from './LeaveConfirmDialog';

interface Props extends DialogProps {}

export default function WriteReviewDialog({ children, ...props }: Props) {
  const [isOpenLeaveConfirmDialog, setIsOpenLeaveConfirmDialog] =
    useState(false);

  return (
    <>
      <Dialog {...props}>
        {children}
        <DialogContent
          className="flex h-[94vh] w-[900px] min-w-[900px] flex-col gap-4 overflow-y-auto p-10"
          overlayClassName="bg-black/50"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle />
            <div className="flex items-center gap-2">
              <img
                src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788970132099.jpg"
                className="h-[40px] rounded-sm"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  차라투스트라는 이렇게 말했다
                </p>
                <p className="text-xs text-gray-500">
                  프리드리히 니체 · 민음사 · 2021
                </p>
              </div>
            </div>
          </DialogHeader>
          <Input placeholder="제목" />
          <Textarea placeholder="내용" className="flex-1" />
          <div className="flex justify-end">
            <Button onClick={() => setIsOpenLeaveConfirmDialog(true)}>
              제출하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <LeaveConfirmDialog
        open={isOpenLeaveConfirmDialog}
        onOpenChange={setIsOpenLeaveConfirmDialog}
      />
    </>
  );
}

WriteReviewDialog.Trigger = DialogTrigger;
