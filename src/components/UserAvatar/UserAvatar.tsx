import { UserBase } from '@/apis/user/types';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  user: UserBase;
  size?: 'sm' | 'md' | 'lg';
  showNickname?: boolean;
  className?: string;
}

export default function UserAvatar({
  user,
  size = 'md',
  showNickname = true,
  className,
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/user/${user.id}`}
      className="group flex items-center gap-2"
      onClick={handleClick}
    >
      <Avatar className={`${avatarSize} ${className ?? ''}`}>
        <AvatarImage src={user.imageUrl ?? undefined} />
        <AvatarFallback>
          {user.nickname?.slice(0, 1).toUpperCase() ?? 'U'}
        </AvatarFallback>
      </Avatar>
      {showNickname && (
        <p className={`font-medium ${textSize} group-hover:underline`}>
          {user.nickname ?? '알 수 없음'}
        </p>
      )}
    </Link>
  );
}
