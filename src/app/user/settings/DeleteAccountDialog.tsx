'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogDescription, DialogProps } from '@radix-ui/react-dialog';
import { useState } from 'react';

interface Props extends DialogProps {}

export default function DeleteAccountDialog({ children, ...props }: Props) {
  const [confirmText, setConfirmText] = useState('');

  return (
    <Dialog {...props}>
      {children}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>계정 삭제하기</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            삭제한 계정은 되돌릴 수 없어요.
            <br />
            삭제를 원하시면 &apos;삭제&apos;를 입력해 주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="'삭제'를 입력해 주세요..."
            value={confirmText}
            onChange={e => setConfirmText(e.target.value)}
          />

          <Button
            variant="destructive"
            className="w-full"
            disabled={confirmText !== '삭제'}
          >
            삭제하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

DeleteAccountDialog.Trigger = DialogTrigger;
