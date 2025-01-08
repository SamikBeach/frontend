import { authApi } from '@/apis/auth/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface UserInfoFormData {
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface Props {
  email: string;
  onSuccess?: () => void;
}

export default function UserInfoForm({ email, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserInfoFormData>({
    defaultValues: {
      nickname: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    mutate: initiateRegistration,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: { nickname: string; password: string }) =>
      authApi.initiateRegistration({
        email,
        ...data,
      }),
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit(data => {
    initiateRegistration({
      nickname: data.nickname,
      password: data.password,
    });
  });

  const { field: nicknameField } = useController({
    name: 'nickname',
    control,
    rules: {
      required: '닉네임을 입력해주세요',
      minLength: {
        value: 2,
        message: '닉네임은 최소 2자 이상이어야 합니다',
      },
      maxLength: {
        value: 20,
        message: '닉네임은 최대 20자까지 가능합니다',
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

  const { field: confirmPasswordField } = useController({
    name: 'confirmPassword',
    control,
    rules: {
      required: '비밀번호 확인을 입력해주세요',
      validate: value =>
        value === watch('password') || '비밀번호가 일치하지 않습니다',
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
            {...nicknameField}
            placeholder="닉네임을 입력해 주세요."
            className="w-full rounded-md border border-gray-200 p-4"
          />
          {errors.nickname?.message && (
            <span className="text-xs text-red-500">
              {errors.nickname.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            {...passwordField}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            className="w-full rounded-md border border-gray-200 p-4"
          />
          {errors.password?.message && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Input
            {...confirmPasswordField}
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요."
            className="w-full rounded-md border border-gray-200 p-4"
          />
          {errors.confirmPassword?.message && (
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-500">
            {(
              error as AxiosError<{
                message: string;
              }>
            ).response?.data?.message ||
              '회원가입 처리 중 오류가 발생했습니다.'}
          </span>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? '처리 중...' : '다음'}
        </Button>
      </div>
    </form>
  );
}
