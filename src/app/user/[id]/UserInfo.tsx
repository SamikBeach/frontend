'use client';

import { userApi } from '@/apis/user/user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
  userId: number;
}

function UserInfoContent({ userId }: Props) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserDetail(userId),
    select: response => response.data,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src={'https://picsum.photos/200/200'}
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

function UserInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="h-[200px] w-[200px] flex-shrink-0 animate-pulse rounded-full bg-gray-200" />
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UserInfo(props: Props) {
  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfoContent {...props} />
    </Suspense>
  );
}
