'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import UserHistory from './UserHistory';
import UserInfo from './UserInfo';

export default function UserPage() {
  const { id } = useParams();
  const userId = Number(id);

  return (
    <div className="mx-auto flex w-[1080px] flex-col gap-6 py-10">
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo userId={userId} />
      </Suspense>
      <Suspense fallback={<UserHistorySkeleton />}>
        <UserHistory userId={userId} />
      </Suspense>
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

function UserHistorySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-10 w-full animate-pulse rounded-md bg-gray-200" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-32 w-full animate-pulse rounded-md bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
