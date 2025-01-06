'use client';

import { LoginDialog } from '@/components/LoginDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RightSlot() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  if (!isLoggedIn) {
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
      <DropdownMenuTrigger>
        <Avatar className="relative h-8 w-8 cursor-pointer after:absolute after:inset-0 after:rounded-full after:border-2 after:border-primary/50 after:opacity-0 after:transition-opacity hover:after:opacity-100">
          <AvatarImage
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
            className="rounded-full"
          />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push('/user/1')}
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
          onClick={() => setIsLoggedIn(false)}
        >
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
