import { authApi } from '@/apis/auth/auth';
import { currentUserAtom } from '@/atoms/auth';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import Google from '@/svgs/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

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

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const checkEmailMutation = useMutation({
    mutationFn: authApi.checkEmail,
    onSuccess: () => {
      onEmailVerified(emailField.value);
    },
  });

  const onSubmit = handleSubmit(data => {
    checkEmailMutation.mutate({ email: data.email });
  });

  const {
    mutate: mutateGoogleLogin,
    isPending,
    error: googleLoginError,
  } = useMutation({
    mutationKey: ['googleLogin'],
    mutationFn: (code: string) => authApi.googleLogin(code),
    onSuccess: response => {
      const { accessToken, user } = response.data;
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      setCurrentUser(user);
      onSuccess?.();
    },
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
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
          {checkEmailMutation.error && (
            <span className="text-xs text-red-500">
              {(checkEmailMutation.error as AxiosError<{ message: string }>)
                .response?.data?.message || '이메일 확인에 실패했습니다.'}
            </span>
          )}
        </div>
        <Button type="submit" disabled={checkEmailMutation.isPending}>
          {checkEmailMutation.isPending ? '확인 중...' : '회원가입'}
        </Button>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant="outline"
            onClick={() => googleLogin()}
            disabled={isPending}
          >
            <Google />
            {isPending ? '로그인 중...' : '구글 계정으로 회원가입'}
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
          <Button variant="link" className="h-6 p-0 text-gray-500">
            이용약관
          </Button>
          <span className="px-1 text-gray-500">·</span>
          <Button variant="link" className="h-6 p-0 text-gray-500">
            개인정보처리방침
          </Button>
        </div>
      </div>
    </form>
  );
}
