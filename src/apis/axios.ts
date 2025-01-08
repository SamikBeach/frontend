import { accessTokenAtom } from '@/atoms/auth';
import axios from 'axios';
import { getDefaultStore } from 'jotai';
import type { AuthResponse } from './auth/types';

const store = getDefaultStore();

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true, // refreshToken을 쿠키로 주고받기 위해 필요
});

// 요청 인터셉터
instance.interceptors.request.use(
  config => {
    // atom에서 액세스 토큰 가져오기
    const accessToken = store.get(accessTokenAtom);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 토큰 갱신 요청이 실패한 경우는 재시도하지 않음
    if (originalRequest.url === '/auth/refresh') {
      store.set(accessTokenAtom, null);
      return Promise.reject(error);
    }

    // 액세스 토큰이 만료되고(401) 아직 재시도하지 않은 경우에만 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        // 재시도 플래그 설정
        originalRequest._retry = true;

        // 리프레시 토큰으로 새로운 액세스 토큰 발급 요청
        const response = await instance.post<AuthResponse>('/auth/refresh');
        const newAccessToken = response.data.accessToken;

        // atom에 새로운 액세스 토큰 저장
        store.set(accessTokenAtom, newAccessToken);

        // 원래 요청 한 번만 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우
        store.set(accessTokenAtom, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
