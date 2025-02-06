import { authApi } from '@/apis/auth/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useController, useForm } from 'react-hook-form';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface Props {
  email: string;
  onSuccess: () => void;
  onClickGoToLogin: () => void;
}

export default function ResetPasswordForm({
  email,
  onSuccess,
  onClickGoToLogin,
}: Props) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { field: newPasswordField } = useController({
    name: 'newPassword',
    control,
    rules: {
      required: '새로운 비밀번호를 입력해주세요',
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
      required: '비밀번호를 다시 입력해주세요',
      validate: value =>
        value === watch('newPassword') || '비밀번호가 일치하지 않습니다',
    },
  });

  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: (newPassword: string) =>
      authApi.resetPassword(email, newPassword),
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
      onSuccess();
    },
  });

  const onSubmit = handleSubmit(data => {
    resetPassword(data.newPassword);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-1">
        <Input
          {...newPasswordField}
          placeholder="새로운 비밀번호를 입력해 주세요."
          type="password"
          className="w-full rounded-md border border-gray-200 p-4"
        />
        {errors.newPassword && (
          <span className="text-xs text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Input
          {...confirmPasswordField}
          placeholder="비밀번호를 다시 입력해 주세요."
          type="password"
          className="w-full rounded-md border border-gray-200 p-4"
        />
        {errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-500">
          {(error as AxiosError<{ message: string }>).response?.data?.message ||
            '비밀번호 변경에 실패했습니다. 다시 시도해주세요.'}
        </span>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? '변경 중...' : '비밀번호 변경'}
      </Button>

      <div className="flex flex-col items-center gap-1 text-sm">
        <Button
          type="button"
          variant="link"
          className="h-6 py-0 text-gray-500"
          onClick={onClickGoToLogin}
        >
          로그인으로 돌아가기
        </Button>
      </div>
    </form>
  );
}
