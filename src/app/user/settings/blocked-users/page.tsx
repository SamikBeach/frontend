'use client';

import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/UserAvatar';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function BlockedUsersPage() {
  const router = useRouter();
  const { data: blockedUsers = [] } = useSuspenseQuery({
    queryKey: ['blockedUsers'],
    queryFn: () => userApi.getBlockedUsers().then(res => res.data),
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">차단한 사용자</h1>

      {blockedUsers.length === 0 ? (
        <div className="flex h-[200px] items-center justify-center rounded-lg border">
          <p className="text-sm text-gray-500">차단한 사용자가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blockedUsers.map(user => (
            <div
              key={user.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <UserAvatar user={user} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  userApi.unblockUser(user.id).then(() => {
                    router.refresh();
                  });
                }}
              >
                차단 해제
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
