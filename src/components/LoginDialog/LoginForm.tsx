import { authApi } from '@/apis/auth/auth';
import axios from '@/apis/axios';
import { isLoggedInAtom } from '@/atoms/auth';
import Google from '@/svgs/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LoginFormData {
  email: string;
  password: string;
}

interface Props {
  onClickGoToSignUp: () => void;
  onSuccess?: () => void;
}

export default function LoginForm({ onClickGoToSignUp, onSuccess }: Props) {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
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

  const { field: passwordField } = useController({
    name: 'password',
    control,
    rules: {
      required: '비밀번호를 입력해주세요',
      minLength: {
        value: 6,
        message: '비밀번호는 최소 6자 이상이어야 합니다',
      },
    },
  });

  // 이메일 로그인
  const {
    mutate: mutateEmailLogin,
    isPending: isEmailLoginPending,
    error: emailLoginError,
    reset: resetEmailLoginError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: response => {
      const accessToken = response.data.accessToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setIsLoggedIn(true);
      onSuccess?.();
    },
  });

  // 폼 값이 변경될 때마다 에러 초기화
  watch(() => {
    if (emailLoginError) resetEmailLoginError();
  });

  const onSubmit = handleSubmit(data => {
    mutateEmailLogin(data);
  });

  // 구글 로그인 (기존 코드)
  const {
    mutate: mutateGoogleLogin,
    isPending: isGoogleLoginPending,
    error: googleLoginError,
    reset: resetGoogleLoginError,
  } = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: (code: string) => authApi.googleLogin(code),
    onSuccess: response => {
      const accessToken = response.data.accessToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setIsLoggedIn(true);
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
        </div>
        <div className="flex flex-col gap-1">
          <Input
            {...passwordField}
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            className="w-full rounded-md border border-gray-200 p-4"
          />
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
          {emailLoginError && (
            <span className="text-xs text-red-500">
              {(emailLoginError as AxiosError<{ message: string }>).response
                ?.data?.message || '로그인에 실패했습니다.'}
            </span>
          )}
        </div>
        <Button type="submit" disabled={isEmailLoginPending}>
          {isEmailLoginPending ? '로그인 중...' : '로그인'}
        </Button>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => googleLogin()}
            disabled={isGoogleLoginPending}
          >
            <Google />
            {isGoogleLoginPending ? '로그인 중...' : '구글 계정으로 로그인'}
          </Button>
          {googleLoginError && (
            <span className="text-xs text-red-500">
              {(googleLoginError as AxiosError<{ message: string }>).response
                ?.data?.message ||
                '구글 로그인에 실패했습니다. 다시 시도해주세요.'}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 text-sm">
        <Button variant="link" className="h-6 py-0 text-gray-500">
          비밀번호를 잊으셨나요?
        </Button>

        <div className="flex items-center">
          아직 계정이 없으신가요?
          <Button
            type="button"
            variant="link"
            className="h-6 p-1 text-gray-500"
            onClick={onClickGoToSignUp}
          >
            회원가입
          </Button>
        </div>
      </div>
    </form>
  );
}
