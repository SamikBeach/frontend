'use client';

import { authApi } from '@/apis/auth/auth';
import axios from '@/apis/axios';
import { currentUserAtom } from '@/atoms/auth';
import { useSetAtom } from 'jotai';
import { useEffect, useLayoutEffect } from 'react';

export default function SilentRefresh() {
  const setCurrentUser = useSetAtom(currentUserAtom);

  useLayoutEffect(() => {
    // 초기 토큰 갱신 시도
    const initializeAuth = async () => {
      try {
        const response = await authApi.refresh();
        const { accessToken, user } = response.data;

        axios.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
        setCurrentUser(user);
      } catch {
        // refresh token이 없거나 만료된 경우 조용히 실패
        setCurrentUser(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    };

    initializeAuth();
  }, [setCurrentUser]);

  return null;
}
