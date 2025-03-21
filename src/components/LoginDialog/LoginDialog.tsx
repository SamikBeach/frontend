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
import { ResetPasswordRequestForm } from './ResetPasswordRequestForm';
import SignUpForm from './SignUpForm';
import UserInfoForm from './UserInfoForm';
import VerifyCodeForm from './VerifyCodeForm';

type AuthMode =
  | 'login'
  | 'signup'
  | 'userInfo'
  | 'verifyCode'
  | 'resetPassword';

interface Props extends ComponentPropsWithoutRef<typeof Dialog> {}

export default function LoginDialog(props: Props) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [signUpEmail, setSignUpEmail] = useState<string>('');

  const handleEmailVerified = (email: string) => {
    setSignUpEmail(email);
    setMode('userInfo');
  };

  const handlePointerDownOutside = (e: Event) => {
    if (
      mode === 'userInfo' ||
      mode === 'verifyCode' ||
      mode === 'resetPassword'
    ) {
      e.preventDefault();
    }
  };

  return (
    <Dialog
      {...props}
      onOpenChange={open => {
        if (!open) {
          setMode('login');
        }

        props.onOpenChange?.(open);
      }}
    >
      <DialogContent
        className="flex h-[450px] w-96 flex-col"
        overlayClassName="bg-black/10"
        onPointerDownOutside={handlePointerDownOutside}
        aria-describedby={undefined}
      >
        <DialogHeader className="flex items-center py-4">
          <DialogTitle>
            <Logo />
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-1">
          {mode === 'login' && (
            <LoginForm
              onClickGoToSignUp={() => setMode('signup')}
              onClickResetPassword={() => setMode('resetPassword')}
              onSuccess={() => props.onOpenChange?.(false)}
            />
          )}
          {mode === 'signup' && (
            <SignUpForm
              onClickGoToLogin={() => setMode('login')}
              onEmailVerified={handleEmailVerified}
              onSuccess={() => props.onOpenChange?.(false)}
            />
          )}
          {mode === 'userInfo' && (
            <UserInfoForm
              email={signUpEmail}
              onSuccess={() => {
                setMode('verifyCode');
              }}
            />
          )}
          {mode === 'verifyCode' && (
            <VerifyCodeForm
              email={signUpEmail}
              onSuccess={() => {
                setMode('login');
                props.onOpenChange?.(false);
              }}
            />
          )}
          {mode === 'resetPassword' && (
            <ResetPasswordRequestForm
              onClickGoToLogin={() => setMode('login')}
              onSuccess={() => {
                setMode('login');
                props.onOpenChange?.(false);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
