'use client';

import { UserBase } from '@/apis/user/types';
import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/UserAvatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import BlockedUsersListSkeleton from './BlockedUsersListSkeleton';

export default function BlockedUsersList() {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  const { data: blockedUsers = [], isLoading } = useQuery<UserBase[]>({
    queryKey: ['blockedUsers'],
    queryFn: async () => {
      const response = await userApi.getBlockedUsers();
      return response.data;
    },
    enabled: !!currentUser,
  });

  const { mutate: unblockUser } = useMutation({
    mutationFn: (userId: number) => userApi.unblockUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blockedUsers'] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  if (isLoading || !currentUser) {
    return <BlockedUsersListSkeleton />;
  }

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
                onClick={() => unblockUser(user.id)}
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
