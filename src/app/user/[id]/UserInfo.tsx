'use client';

import { userApi } from '@/apis/user/user';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

interface Props {
  userId: number;
}

function UserInfoContent({ userId }: Props) {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userApi.getUserDetail(userId),
    select: response => response.data,
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: (file: File) => userApi.uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
      toast.success('프로필 이미지가 업데이트되었습니다.');
    },
    onError: () => {
      toast.error('이미지 업로드에 실패했습니다.');
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src={user?.imageUrl || 'https://picsum.photos/200/200'}
            alt={user?.nickname}
            className="absolute inset-0 h-full w-full object-cover"
            width={200}
            height={200}
          />
          <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium text-white">이미지 변경</span>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-2xl font-bold">{user?.nickname}</h1>
          </div>
        </div>
      </div>
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

export default function UserInfo(props: Props) {
  return (
    <Suspense fallback={<UserInfoSkeleton />}>
      <UserInfoContent {...props} />
    </Suspense>
  );
}
