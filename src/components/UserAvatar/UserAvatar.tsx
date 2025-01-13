import { User } from '@/apis/user/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  user: Pick<User, 'nickname'>;
  size?: 'sm' | 'md' | 'lg';
  showNickname?: boolean;
}

export default function UserAvatar({
  user,
  size = 'md',
  showNickname = true,
}: Props) {
  const avatarSize = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }[size];

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <Avatar className={avatarSize}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{user.nickname?.slice(0, 2) ?? 'UN'}</AvatarFallback>
      </Avatar>
      {showNickname && (
        <p className={`font-medium ${textSize}`}>
          {user.nickname ?? '알 수 없음'}
        </p>
      )}
    </div>
  );
}
