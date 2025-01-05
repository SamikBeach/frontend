import Google from '@/svgs/google';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Props {
  onClickGoToLogin: () => void;
}

export default function SignUpForm({ onClickGoToLogin }: Props) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Input
          placeholder="이메일을 입력해 주세요."
          type="email"
          className="w-full rounded-md border border-gray-200 p-4"
        />

        <Button type="submit">회원가입</Button>
        <Button variant="outline">
          <Google />
          구글 계정으로 회원가입
        </Button>
      </div>
      <div className="mb-5 flex flex-col items-center gap-1 text-sm">
        <div className="flex items-center">
          이미 회원이신가요?
          <Button
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
    </div>
  );
}
