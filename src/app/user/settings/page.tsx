'use client';

import { Button } from '@/components/ui/button';
import ChangePasswordDialog from './ChangePasswordDialog';
import DeleteAccountDialog from './DeleteAccountDialog';

export default function Settings() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <p className="font-semibold">비밀번호 변경</p>
        <ChangePasswordDialog>
          <ChangePasswordDialog.Trigger asChild>
            <Button className="w-fit">비밀번호 변경</Button>
          </ChangePasswordDialog.Trigger>
        </ChangePasswordDialog>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold">계정 삭제</p>
        <DeleteAccountDialog>
          <DeleteAccountDialog.Trigger asChild>
            <Button variant="destructive" className="w-fit">
              계정 삭제
            </Button>
          </DeleteAccountDialog.Trigger>
        </DeleteAccountDialog>
      </div>
    </div>
  );
}
