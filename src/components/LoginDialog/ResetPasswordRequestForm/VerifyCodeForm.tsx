import { authApi } from '@/apis/auth/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useController, useForm } from 'react-hook-form';

interface VerifyCodeFormData {
  code: string;
}

interface Props {
  email: string;
  onSuccess: () => void;
  onClickGoToLogin: () => void;
}

export default function VerifyCodeForm({
  email,
  onSuccess,
  onClickGoToLogin,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormData>({
    defaultValues: {
      code: '',
    },
  });

  const { field: codeField } = useController({
    name: 'code',
    control,
    rules: {
      required: '인증 코드를 입력해주세요',
      minLength: {
        value: 6,
        message: '인증 코드는 6자리입니다',
      },
      maxLength: {
        value: 6,
        message: '인증 코드는 6자리입니다',
      },
    },
  });

  const {
    mutate: verifyCode,
    isPending,
    error,
  } = useMutation({
    mutationFn: (code: string) => authApi.verifyPasswordResetCode(email, code),
    onSuccess: () => {
      toast.success('인증 코드가 확인되었습니다.');
      onSuccess();
    },
  });

  const onSubmit = handleSubmit(data => {
    verifyCode(data.code);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-4">
      <div className="flex flex-col gap-1">
        <Input
          {...codeField}
          placeholder="인증 코드 6자리를 입력해 주세요."
          type="text"
          className="w-full rounded-md border border-gray-200 p-4"
        />
        {errors.code && (
          <span className="text-xs text-red-500">{errors.code.message}</span>
        )}
        {error && (
          <span className="text-xs text-red-500">
            {(error as AxiosError<{ message: string }>).response?.data
              ?.message || '인증 코드 확인에 실패했습니다. 다시 시도해주세요.'}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? '확인 중...' : '인증 코드 확인'}
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
