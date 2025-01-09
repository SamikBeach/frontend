import { authApi } from '@/apis/auth/auth';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import originalAxios from 'axios';

const axios = originalAxios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

// 토큰 리프레시 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 리프레시 대기 중인 요청들을 저장하는 배열
let refreshSubscribers: ((token: string) => void)[] = [];

// 리프레시 완료 후 대기 중인 요청들을 처리하는 함수
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach(cb => cb(accessToken));
  refreshSubscribers = [];
};

// 리프레시 토큰으로 새 액세스 토큰을 요청하는 함수
const refreshAccessToken = async () => {
  try {
    const response = await authApi.refresh();

    const { accessToken } = response.data;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    return accessToken;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    throw error;
  }
};

// 요청 인터셉터
axios.interceptors.request.use(config => {
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 401 에러가 아니거나 이미 재시도했던 요청이면 에러를 그대로 반환
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 토큰 리프레시 시도
    if (!isRefreshing) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);

        // 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        return Promise.reject(refreshError);
      }
    }

    // 리프레시 진행 중일 때는 새로운 Promise를 반환하여 나중에 처리
    return new Promise(resolve => {
      refreshSubscribers.push(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
  }
);

export default axios;
