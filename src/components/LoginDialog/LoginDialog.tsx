import Google from '@/svgs/google';
import { ComponentPropsWithoutRef } from 'react';
import { Logo } from '../Logo';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
      <DialogContent className="w-96" overlayClassName="bg-black/10">
        <DialogHeader className="flex items-center py-6">
          <Logo />
        </DialogHeader>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Input
              placeholder="이메일을 입력해 주세요."
              type="email"
              className="w-full rounded-md border border-gray-200 p-4"
            />
            <Input
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              className="w-full rounded-md border border-gray-200 p-4"
            />
            <Button type="submit">로그인</Button>
            <Button variant="outline">
              <Google />
              구글 계정으로 로그인
            </Button>
          </div>
          <div className="mb-5 flex flex-col items-center gap-1 text-sm">
            <Button variant="link" className="h-6 py-0 text-gray-500">
              비밀번호를 잊으셨나요?
            </Button>

            <div className="flex items-center">
              아직 계정이 없으신가요?
              <Button variant="link" className="h-6 p-1 text-gray-500">
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
