'use client';

import { User } from '@/apis/user/types';

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src={user.imageUrl || 'https://picsum.photos/200/200'}
            alt={user.nickname}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={200}
            height={200}
          />
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">{user.nickname}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
