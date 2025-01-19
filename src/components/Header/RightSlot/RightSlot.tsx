'use client';

import { authApi } from '@/apis/auth/auth';
import { currentUserAtom, isLoggedInAtom } from '@/atoms/auth';
import { LoginDialog } from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserAvatar } from '@/components/UserAvatar';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RightSlot() {
  const router = useRouter();
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const currentUser = useAtomValue(currentUserAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      setCurrentUser(null);
    },
    onError: error => {
      console.error('Logout failed:', error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!isLoggedIn || !currentUser) {
    return (
      <>
        <Button variant="ghost" onClick={() => setShowLoginDialog(true)}>
          로그인
        </Button>
        <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative cursor-pointer after:absolute after:inset-0 after:rounded-full after:border-2 after:border-primary/50 after:opacity-0 after:transition-opacity hover:after:opacity-100">
          <UserAvatar user={currentUser} size="sm" showNickname={false} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/user/${currentUser.id}`)}
        >
          <User className="mr-2 h-4 w-4" />내 프로필
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/user/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          설정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 hover:!text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
