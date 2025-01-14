import { authApi } from '@/apis/auth/auth';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { useQueryParams } from '@/hooks/useQueryParams';
import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { toast } from '../ui/sonner';

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

interface Props extends DialogProps {}

export default function ResetPasswordDialog(props: Props) {
  const { searchParams } = useQueryParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const { isOpen, close } = useDialogQuery({ type: 'reset-password' });
  console.log({ isOpen });

  const router = useRouter();

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

  const { mutate: verifyToken, isPending: isVerifying } = useMutation({
    mutationFn: () => {
      if (!email || !token) {
        throw new Error('이메일 또는 토큰이 없습니다.');
      }

      return authApi.verifyPasswordResetToken(email, token);
    },
    onError: () => {
      toast.error('유효하지 않거나 만료된 링크입니다.');
      router.push('/');
    },
  });

  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: (data: ResetPasswordFormData) => {
      if (!email || !token) {
        throw new Error('이메일 또는 토큰이 없습니다.');
      }

      return authApi.resetPassword(email, token, data.newPassword);
    },
    onSuccess: () => {
      router.push('/');
      toast.success('비밀번호가 변경되었습니다.');
    },
  });

  useEffect(() => {
    if (isOpen) {
      verifyToken();
    }
  }, [isOpen]);

  const onSubmit = handleSubmit(data => {
    resetPassword(data);
  });

  return (
    <Dialog {...props} open={isOpen} onOpenChange={open => !open && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>새로운 비밀번호 설정</DialogTitle>
        </DialogHeader>

        {isVerifying ? (
          <div className="flex items-center justify-center py-4">
            <div className="text-sm">토큰 검증 중...</div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Input
                {...newPasswordField}
                type="password"
                placeholder="새로운 비밀번호"
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
                type="password"
                placeholder="비밀번호 확인"
              />
              {errors.confirmPassword && (
                <span className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button type="submit" disabled={isResetting}>
              {isResetting ? '변경 중...' : '비밀번호 변경'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
