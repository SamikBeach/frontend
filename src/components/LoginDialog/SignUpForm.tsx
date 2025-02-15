import { authApi } from '@/apis/auth/auth';
import { currentUserAtom } from '@/atoms/auth';
import PrivacyDialog from '@/components/PrivacyDialog/PrivacyDialog';
import TermsDialog from '@/components/TermsDialog/TermsDialog';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import Apple from '@/svgs/apple';
import Google from '@/svgs/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '../ui/sonner';

interface SignUpFormData {
  email: string;
}

interface Props {
  onClickGoToLogin: () => void;
  onEmailVerified: (email: string) => void;
  onSuccess?: () => void;
}

export default function SignUpForm({
  onClickGoToLogin,
  onEmailVerified,
  onSuccess,
}: Props) {
  const setCurrentUser = useSetAtom(currentUserAtom);
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
    },
  });

  const { field: emailField } = useController({
    name: 'email',
    control,
    rules: {
      required: '이메일을 입력해주세요',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
  });

  const {
    mutate: checkEmail,
    isPending: isCheckingEmail,
    error: checkEmailError,
    reset: resetCheckEmailError,
  } = useMutation({
    mutationFn: authApi.checkEmail,
    onSuccess: () => {
      onEmailVerified(emailField.value);
    },
  });

  // 폼 값이 변경될 때마다 에러 초기화
  watch(() => {
    if (checkEmailError) resetCheckEmailError();
  });

  const onSubmit = handleSubmit(data => {
    checkEmail({ email: data.email });
  });

  const {
    mutate: mutateGoogleLogin,
    isPending: isGoogleLoginPending,
    error: googleLoginError,
    reset: resetGoogleLoginError,
  } = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: (code: string) =>
      authApi.googleLogin({ code, clientType: 'web' }),
    onSuccess: response => {
      const { accessToken, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      setCurrentUser(user);
      toast.success('회원가입에 성공했습니다.');
      onSuccess?.();
    },
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      resetGoogleLoginError();
      mutateGoogleLogin(code);
    },
    onError: error => {
      console.error('Google login error:', error);
    },
  });

  const {
    mutate: mutateAppleLogin,
    isPending: isAppleLoginPending,
    error: appleLoginError,
  } = useMutation({
    mutationKey: ['appleLogin'],
    mutationFn: (idToken: string) => authApi.appleLogin({ idToken }),
    onSuccess: response => {
      const { accessToken, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      setCurrentUser(user);
      toast.success('회원가입에 성공했습니다.');
      onSuccess?.();
    },
  });

  const handleAppleLogin = async () => {
    console.log('Apple login init: start');
    try {
      // SDK가 로드되었는지 확인
      if (!window.AppleID) {
        toast.error(
          '애플 로그인을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.'
        );
        return;
      }
      console.log('Apple login init: before');

      await window.AppleID.auth.init({
        clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID!,
        scope: 'name email',
        redirectURI: process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI!,
        state: crypto.randomUUID(),
        nonce: crypto.randomUUID(),
        usePopup: true,
      });

      const response = await window.AppleID.auth.signIn();

      if (response.authorization?.id_token) {
        mutateAppleLogin(response.authorization.id_token);
      } else {
        throw new Error('Failed to get id_token from Apple');
      }
    } catch (error) {
      console.error('Apple login error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('애플 로그인에 실패했습니다.');
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-between gap-3 pt-4"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input
            {...emailField}
            placeholder="이메일을 입력해 주세요."
            type="email"
            className="w-full rounded-md border border-gray-200 p-4"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
          {checkEmailError && (
            <span className="text-xs text-red-500">
              {(checkEmailError as AxiosError<{ message: string }>).response
                ?.data?.message || '이메일 확인에 실패했습니다.'}
            </span>
          )}
        </div>
        <Button type="submit" disabled={isCheckingEmail}>
          {isCheckingEmail ? '확인 중...' : '회원가입'}
        </Button>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => googleLogin()}
            disabled={isGoogleLoginPending}
          >
            <Google />
            {isGoogleLoginPending ? '로그인 중...' : '구글 계정으로 회원가입'}
          </Button>
          {googleLoginError && (
            <span className="text-xs text-red-500">
              {(googleLoginError as AxiosError<{ message: string }>).response
                ?.data?.message ||
                '구글 로그인에 실패했습니다. 다시 시도해주세요.'}
            </span>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleAppleLogin}
          disabled={isAppleLoginPending}
          className="flex items-center gap-0.5"
        >
          <Apple />
          {isAppleLoginPending ? '로그인 중...' : '애플 계정으로 회원가입'}
        </Button>
        {appleLoginError && (
          <span className="text-xs text-red-500">
            {(appleLoginError as AxiosError<{ message: string }>).response?.data
              ?.message || '애플 로그인에 실패했습니다. 다시 시도해주세요.'}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center gap-1 text-sm">
        <div className="flex items-center">
          이미 회원이신가요?
          <Button
            type="button"
            variant="link"
            className="h-6 p-1 text-gray-500"
            onClick={onClickGoToLogin}
          >
            로그인
          </Button>
        </div>

        <div className="flex items-center">
          <Button
            type="button"
            variant="link"
            className="h-6 p-0 text-gray-500"
            onClick={() => setOpenTerms(true)}
          >
            이용약관
          </Button>
          <span className="px-1 text-gray-500">·</span>
          <Button
            type="button"
            variant="link"
            className="h-6 p-0 text-gray-500"
            onClick={() => setOpenPrivacy(true)}
          >
            개인정보처리방침
          </Button>
        </div>
      </div>

      <TermsDialog open={openTerms} onOpenChange={setOpenTerms} />
      <PrivacyDialog open={openPrivacy} onOpenChange={setOpenPrivacy} />
    </form>
  );
}
