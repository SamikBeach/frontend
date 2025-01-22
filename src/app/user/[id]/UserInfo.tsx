'use client';

import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { UserAvatar } from '@/components/UserAvatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';

interface Props {
  userId: number;
}

function UserInfoContent({ userId }: Props) {
  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();
  const isMyProfile = currentUser?.id === userId;

  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserDetail(userId),
    select: response => response.data,
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: (file: File) => userApi.uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      if (isMyProfile) {
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }

      toast.success('프로필 이미지가 업데이트되었습니다.');
    },
    onError: () => {
      toast.error('이미지 업로드에 실패했습니다.');
    },
  });

  const { mutate: deleteImage } = useMutation({
    mutationFn: () => userApi.deleteProfileImage(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      toast.success('프로필 이미지가 삭제되었습니다.');
    },
    onError: () => {
      toast.error('이미지 삭제에 실패했습니다.');
    },
  });

  const { mutate: updateNickname } = useMutation({
    mutationFn: (nickname: string) => userApi.updateProfile({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });

      if (isMyProfile) {
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }

      toast.success('닉네임이 변경되었습니다.');
      setIsEditing(false);
    },
    onError: () => {
      toast.error('닉네임 변경에 실패했습니다.');
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newNickname, setNewNickname] = useState(user.nickname);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleNicknameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNickname.trim() && newNickname !== user.nickname) {
      updateNickname(newNickname);
    } else {
      setIsEditing(false);
      setNewNickname(user.nickname);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      uploadImage(file);
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <div className="group relative h-[140px] w-[140px] flex-shrink-0 overflow-hidden rounded-full bg-gray-200 md:h-[200px] md:w-[200px]">
              <UserAvatar
                user={user}
                showNickname={false}
                className="h-[140px] w-[140px] cursor-default md:h-[200px] md:w-[200px]"
              />
              {isMyProfile && (
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">
                    이미지 변경
                  </span>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
            {isMyProfile && user.imageUrl && (
              <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 rounded-full bg-background shadow-md hover:bg-accent md:h-8 md:w-8"
                    >
                      <MoreHorizontalIcon className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => deleteImage()}
                      className="gap-2 text-destructive"
                    >
                      <Trash2Icon className="h-4 w-4" />
                      이미지 삭제
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              {isMyProfile && isEditing ? (
                <form
                  onSubmit={handleNicknameSubmit}
                  className="flex items-center gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={newNickname}
                    onChange={e => setNewNickname(e.target.value)}
                    className="h-9 w-full max-w-[300px] text-2xl font-bold"
                    placeholder="닉네임"
                  />
                  <div className="flex gap-1">
                    <Button type="submit" size="sm">
                      저장
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setNewNickname(user.nickname);
                      }}
                    >
                      취소
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold md:text-2xl">
                    {user.nickname}
                  </h1>
                  {isMyProfile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      className="hover:bg-accent"
                    >
                      <PencilIcon className="h-3.5 w-3.5 text-gray-500" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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

export default function UserInfo(props: Props) {
  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfoContent {...props} />
    </Suspense>
  );
}
