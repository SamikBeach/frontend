'use client';

import { useParams } from 'next/navigation';

import UserHistory from './UserHistory/UserHistory';
import UserInfo from './UserInfo';

export default function UserPage() {
  const { id } = useParams();
  const userId = Number(id);

  return (
    <>
      <UserInfo userId={userId} />
      <UserHistory userId={userId} />
    </>
  );
}
