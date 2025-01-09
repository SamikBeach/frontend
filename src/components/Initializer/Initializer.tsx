'use client';

import { userApi } from '@/apis';
import { currentUserAtom } from '@/atoms/auth';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function Initializer() {
  const setCurrentUser = useSetAtom(currentUserAtom);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userApi.getMyProfile,
    select: data => data.data,
    enabled: !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  });

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user, setCurrentUser]);

  return null;
}
