'use client';

import type { AuthResponse } from '@/apis/auth/types';
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
        const response = await axios.post<AuthResponse>('/auth/refresh');

        setAccessToken(response.data.accessToken);
      } catch {
        // refresh token이 없거나 만료된 경우 조용히 실패
        setAccessToken(null);
      }
    };

    initializeAuth();
  }, [setAccessToken]);

  return null;
}
