import { ComponentPropsWithoutRef, useState } from 'react';
import { Logo } from '../Logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface Props extends ComponentPropsWithoutRef<typeof Dialog> {}

export default function LoginDialog(props: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <Dialog {...props}>
      <DialogContent
        className="flex h-[480px] w-96 flex-col"
        overlayClassName="bg-black/10"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex items-center py-6">
          <DialogTitle>
            <Logo />
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          {mode === 'login' ? (
            <LoginForm onClickGoToSignUp={() => setMode('signup')} />
          ) : (
            <SignUpForm onClickGoToLogin={() => setMode('login')} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
