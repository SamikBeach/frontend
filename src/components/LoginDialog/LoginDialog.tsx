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
              ? t('login_description')
              : t('sign_up_description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{t('email')}</Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{t('password')}</Label>
            <Input id="password" type="password" className="col-span-3" />
          </div>
          {mode === 'register' && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">{t('confirm_password')}</Label>
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
                {t('no_account')}{' '}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={toggleMode}
                >
                  {t('go_to_sign_up')}
                </Button>
              </>
            ) : (
              <>
                {t('already_have_account')}{' '}
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-sm"
                  onClick={toggleMode}
                >
                  {t('go_to_login')}
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
