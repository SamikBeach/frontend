'use client';

import { userApi } from '@/apis/user/user';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import UserHistory from './UserHistory';
import UserInfo from './UserInfo';

export default function UserPage() {
  const { id } = useParams();

  const { data: user } = useQuery({
    queryKey: ['user', Number(id)],
    queryFn: () => userApi.getUserDetail(Number(id)),
    select: response => response.data,
  });

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto flex w-[1080px] flex-col gap-6 py-10">
      <UserInfo user={user} />
      <UserHistory userId={user.id} />
    </div>
  );
}
