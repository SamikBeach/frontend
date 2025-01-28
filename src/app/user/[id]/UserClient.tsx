'use client';

import UserHistory from './UserHistory/UserHistory';
import UserInfo from './UserInfo';

interface Props {
  userId: number;
}

export default function UserClient({ userId }: Props) {
  return (
    <>
      <UserInfo userId={userId} />
      <UserHistory userId={userId} />
    </>
  );
}
