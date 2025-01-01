import { Label } from '@radix-ui/react-dropdown-menu';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithoutRef, useState } from 'react';
import { Button } from '../ui/button';
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

type Mode = 'login' | 'register';

export default function LoginDialog(props: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const t = useTranslations('Common');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[425px]"
        overlayClassName="bg-black/10"
      >
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? t('login') : t('sign_up')}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? '서비스를 이용하기 위해 로그인이 필요합니다.'
              : '회원가입을 통해 더 많은 기능을 이용해보세요.'}
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
          {mode === 'register' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Button type="submit">
            {mode === 'login' ? t('login') : t('sign_up')}
          </Button>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                계정이 없으신가요?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={toggleMode}
                >
                  회원가입 하기
                </Button>
              </>
            ) : (
              <>
                이미 계정이 있으신가요?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={toggleMode}
                >
                  로그인 하기
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
