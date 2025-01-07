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
import { useState } from 'react';

interface Props extends DialogProps {}

export default function ChangePasswordDialog({ children, ...props }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <Dialog {...props}>
      {children}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>비밀번호 변경하기</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">현재 비밀번호</p>
            <Input
              type="password"
              placeholder="현재 비밀번호를 입력해 주세요..."
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">새 비밀번호</p>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력해 주세요..."
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
          </div>

          <Button className="w-full">변경하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ChangePasswordDialog.Trigger = DialogTrigger;
