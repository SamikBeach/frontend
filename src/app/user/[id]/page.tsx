'use client';

import { useParams } from 'next/navigation';

import UserHistory from './UserHistory/UserHistory';
import UserInfo from './UserInfo';

export default function UserPage() {
  const { id } = useParams();
  const userId = Number(id);

  return (
    <div className="mx-auto flex w-[1080px] flex-col gap-6 py-10">
      <UserInfo userId={userId} />
      <UserHistory userId={userId} />
    </div>
  );
}
