'use client';

import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { KeyRound } from 'lucide-react';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface Props extends DialogProps {}

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordDialog({ children, ...props }: Props) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    mutate: changePassword,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      setOpen(false);
      reset();
      toast.success('비밀번호가 변경되었습니다.');
    },
  });

  const onSubmit = handleSubmit(data => {
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  });

  const { field: currentPasswordField } = useController({
    name: 'currentPassword',
    control,
    rules: {
      required: '현재 비밀번호를 입력해주세요',
    },
  });

  const { field: newPasswordField } = useController({
    name: 'newPassword',
    control,
    rules: {
      required: '새 비밀번호를 입력해주세요',
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
        value === watch('newPassword') || '비밀번호가 일치하지 않습니다',
    },
  });

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      reset();
    }
  };

  const errorMessage = (error as AxiosError<{ message: string }>)?.response
    ?.data?.message;
  const isCurrentPasswordError =
    errorMessage === '현재 비밀번호가 일치하지 않습니다.';
  const buttonText = isPending && !isError ? '변경 중...' : '비밀번호 변경하기';

  return (
    <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
      {children}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-2">
              <KeyRound className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-6 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">현재 비밀번호</p>
            <Input
              {...currentPasswordField}
              type="password"
              placeholder="현재 사용중인 비밀번호"
            />
            {(errors.currentPassword?.message || isCurrentPasswordError) && (
              <span className="text-xs text-destructive">
                {errors.currentPassword?.message || errorMessage}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">새 비밀번호</p>
            <Input
              {...newPasswordField}
              type="password"
              placeholder="새로운 비밀번호"
            />
            {errors.newPassword?.message && (
              <span className="text-xs text-destructive">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">새 비밀번호 확인</p>
            <Input
              {...confirmPasswordField}
              type="password"
              placeholder="새로운 비밀번호 재입력"
            />
            {errors.confirmPassword?.message && (
              <span className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </span>
            )}
            {error && !isCurrentPasswordError && (
              <span className="text-xs text-destructive">
                {errorMessage || '비밀번호 변경 중 오류가 발생했습니다.'}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {buttonText}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

ChangePasswordDialog.Trigger = DialogTrigger;
