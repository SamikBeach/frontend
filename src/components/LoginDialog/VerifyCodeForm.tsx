import { authApi } from '@/apis/auth/auth';
import axios from '@/apis/axios';
import { currentUserAtom } from '@/atoms/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useController, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface VerifyCodeFormData {
  code: string;
}

interface Props {
  email: string;
  onSuccess?: () => void;
}

export default function VerifyCodeForm({ email, onSuccess }: Props) {
  const setCurrentUser = useSetAtom(currentUserAtom);

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
      pattern: {
        value: /^[A-Za-z0-9]{6}$/,
        message: '6자리 문자를 입력해주세요',
      },
    },
  });

  const {
    mutate: mutateCompleteRegistration,
    isPending: isCompleteRegistrationPending,
    error: completeRegistrationError,
  } = useMutation({
    mutationFn: authApi.completeRegistration,
    onSuccess: response => {
      const { accessToken, user } = response.data;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setCurrentUser(user);
      onSuccess?.();
    },
  });

  const onSubmit = handleSubmit(data => {
    mutateCompleteRegistration({
      email,
      verificationCode: data.code,
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-between gap-3 pt-4"
    >
      <div className="flex w-full flex-col items-center gap-3">
        <div className="text-center">
          <h3 className="text-lg font-semibold">이메일 인증</h3>
          <p className="text-sm text-gray-500">
            {email}로 전송된
            <br />
            6자리 인증 코드를 입력해주세요
          </p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <InputOTP
            maxLength={6}
            value={codeField.value}
            onChange={codeField.onChange}
          >
            <InputOTPGroup className="justify-center">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {errors.code && (
            <span className="text-xs text-red-500">{errors.code.message}</span>
          )}
          {completeRegistrationError && (
            <span className="text-xs text-red-500">
              {(
                completeRegistrationError as AxiosError<{
                  message: string;
                }>
              ).response?.data?.message || '인증에 실패했습니다.'}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isCompleteRegistrationPending}
        >
          {isCompleteRegistrationPending ? '처리 중...' : '인증하기'}
        </Button>
      </div>
    </form>
  );
}
