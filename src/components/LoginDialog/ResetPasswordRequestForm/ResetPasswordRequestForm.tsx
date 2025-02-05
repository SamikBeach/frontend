import { useState } from 'react';
import EmailForm from './EmailForm';
import ResetPasswordForm from './ResetPasswordForm';
import VerifyCodeForm from './VerifyCodeForm';

interface Props {
  onClickGoToLogin: () => void;
  onSuccess?: () => void;
}

export default function ResetPasswordRequestForm({
  onClickGoToLogin,
  onSuccess,
}: Props) {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');

  const handleEmailSuccess = (email: string) => {
    setEmail(email);
    setStep('code');
  };

  const handleCodeSuccess = () => {
    setStep('password');
  };

  return (
    <>
      {step === 'email' && (
        <EmailForm
          onSuccess={handleEmailSuccess}
          onClickGoToLogin={onClickGoToLogin}
        />
      )}
      {step === 'code' && (
        <VerifyCodeForm
          email={email}
          onSuccess={handleCodeSuccess}
          onClickGoToLogin={onClickGoToLogin}
        />
      )}
      {step === 'password' && (
        <ResetPasswordForm
          email={email}
          onSuccess={onSuccess || onClickGoToLogin}
          onClickGoToLogin={onClickGoToLogin}
        />
      )}
    </>
  );
}
