import { authApi } from '@/apis/auth/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useController, useForm } from 'react-hook-form';

interface EmailFormData {
  email: string;
}

interface Props {
  onSuccess: (email: string) => void;
  onClickGoToLogin: () => void;
}

export default function EmailForm({ onSuccess, onClickGoToLogin }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
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
    mutate: sendCode,
    isPending,
    error,
  } = useMutation({
    mutationFn: authApi.sendPasswordResetCode,
    onSuccess: () => {
      toast.success('인증 코드가 이메일로 전송되었습니다.');
      onSuccess(emailField.value);
    },
  });

  const onSubmit = handleSubmit(data => {
    sendCode(data.email);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-4">
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
        {error && (
          <span className="text-xs text-red-500">
            {(error as AxiosError<{ message: string }>).response?.data
              ?.message || '이메일 전송에 실패했습니다. 다시 시도해주세요.'}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? '전송 중...' : '인증 코드 받기'}
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
