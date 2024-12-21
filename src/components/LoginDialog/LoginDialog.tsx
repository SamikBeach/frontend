import { Button } from '../ui/button';

import { Label } from '@radix-ui/react-dropdown-menu';
import { ComponentPropsWithoutRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';

interface Props extends ComponentPropsWithoutRef<typeof Dialog> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function LoginDialog(props: Props) {
  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[425px]"
        overlayClassName="bg-black/10"
      >
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            서비스를 이용하기 위해 로그인이 필요합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">이메일</Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">비밀번호</Label>
            <Input id="password" type="password" className="col-span-3" />
          </div>
        </div>
        <Button type="submit">로그인</Button>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
