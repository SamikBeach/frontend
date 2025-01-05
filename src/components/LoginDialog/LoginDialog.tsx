import { useTranslations } from 'next-intl';
import { ComponentPropsWithoutRef } from 'react';
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
  const t = useTranslations('Common');

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex items-center">
          <img src="/logo.png" alt="삼익" className="mb-8 h-8" />
        </DialogHeader>
        <div className="flex flex-col gap-4">
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
          <Button
            type="submit"
            className="w-full rounded-md bg-[#18181b] p-4 text-white hover:bg-[#27272a]"
          >
            로그인
          </Button>
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 p-4"
          >
            <img src="/google.png" alt="Google" className="h-5 w-5" />G 구글
            계정으로 로그인
          </Button>
          <div className="mt-2 flex flex-col justify-center gap-4 text-sm text-gray-600">
            <button className="hover:underline">비밀번호를 잊으셨나요?</button>

            <button className="hover:underline">
              아직 계정이 없으신가요? 회원가입
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
