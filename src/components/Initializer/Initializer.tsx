'use client';

import { userApi } from '@/apis';
import { currentUserAtom } from '@/atoms/auth';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

export default function Initializer() {
  const setCurrentUser = useSetAtom(currentUserAtom);

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userApi.getMyProfile,
    select: data => data.data,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    setCurrentUser(user ?? null);
  }, [user, setCurrentUser]);

  return null;
}
