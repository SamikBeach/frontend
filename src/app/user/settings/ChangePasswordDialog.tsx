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
import { DialogProps } from '@radix-ui/react-dialog';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';

interface Props extends DialogProps {}

export default function ChangePasswordDialog({ children, ...props }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Dialog {...props}>
      {children}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">현재 비밀번호</p>
            <Input
              id="current-password"
              type="password"
              placeholder="현재 사용중인 비밀번호"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">새 비밀번호</p>
            <Input
              id="new-password"
              type="password"
              placeholder="새로운 비밀번호"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">새 비밀번호 확인</p>
            <Input
              id="confirm-password"
              type="password"
              placeholder="새로운 비밀번호 재입력"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
          >
            비밀번호 변경하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ChangePasswordDialog.Trigger = DialogTrigger;
