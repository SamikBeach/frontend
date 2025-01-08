import type { AuthResponse } from '@/apis/auth/types';
import axios from '@/apis/axios';
import { accessTokenAtom } from '@/atoms/auth';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

export function SilentRefresh() {
  const [, setAccessToken] = useAtom(accessTokenAtom);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    const silentRefresh = async () => {
      try {
        const response = await axios.post<AuthResponse>('/auth/refresh');
        setAccessToken(response.data.accessToken);

        // 토큰 만료 30초 전에 갱신
        const tokenExp = 3600; // 토큰 만료 시간 (초)
        const refreshTime = (tokenExp - 30) * 1000;
        refreshInterval = setTimeout(silentRefresh, refreshTime);
      } catch (error) {
        console.error('Silent refresh failed:', error);
        setAccessToken(null);
      }
    };

    // 초기 실행
    silentRefresh();

    return () => {
      if (refreshInterval) {
        clearTimeout(refreshInterval);
      }
    };
  }, [setAccessToken]);

  return null;
}
