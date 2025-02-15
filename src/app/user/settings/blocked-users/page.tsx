import { Suspense } from 'react';
import BlockedUsersList from './BlockedUsersList';
import BlockedUsersListSkeleton from './BlockedUsersListSkeleton';

export default function BlockedUsersPage() {
  return (
    <Suspense fallback={<BlockedUsersListSkeleton />}>
      <BlockedUsersList />
    </Suspense>
  );
}
