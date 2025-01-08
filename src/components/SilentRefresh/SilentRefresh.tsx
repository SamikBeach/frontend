'use client';

import { authApi } from '@/apis/auth/auth';
import axios from '@/apis/axios';
import { accessTokenAtom } from '@/atoms/auth';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export default function SilentRefresh() {
  const [, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    // 초기 토큰 갱신 시도
    const initializeAuth = async () => {
      try {
        const response = await authApi.refresh();
        const accessToken = response.data.accessToken;

        setAccessToken(accessToken);

        axios.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
      } catch {
        // refresh token이 없거나 만료된 경우 조용히 실패
        setAccessToken(null);
        delete axios.defaults.headers.common['Authorization'];
      }
    };

    initializeAuth();
  }, [setAccessToken]);

  return null;
}
