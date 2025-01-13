import { authApi } from '@/apis/auth/auth';
import { ERROR_CODES } from '@/constants/error-codes';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import originalAxios from 'axios';

const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

const setToken = (token: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

const removeToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * 커스텀 Axios 인스턴스를 생성합니다.
 * - baseURL: 서버의 기본 URL
 * - withCredentials: 쿠키를 포함한 크로스 도메인 요청을 허용
 */
const axios = originalAxios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

/**
 * 토큰 리프레시 관련 상태 변수들
 */
// 현재 토큰 리프레시가 진행 중인지 나타내는 플래그
let isRefreshing = false;
// 토큰 리프레시 완료를 기다리는 요청들의 콜백 함수 배열
let refreshSubscribers: ((token: string) => void)[] = [];

/**
 * 토큰 리프레시가 완료된 후 대기 중이던 요청들을 처리합니다.
 * @param accessToken - 새로 발급받은 액세스 토큰
 */
const onRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach(cb => cb(accessToken));
  refreshSubscribers = [];
};

/**
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청합니다.
 * @returns 새로 발급받은 액세스 토큰
 * @throws 토큰 리프레시 실패 시 에러
 */
const refreshAccessToken = async () => {
  try {
    const response = await authApi.refresh();

    const { accessToken } = response.data;
    setToken(accessToken);
    return accessToken;
  } catch (error) {
    removeToken();
    throw error;
  }
};

/**
 * 요청 인터셉터
 * 모든 요청에 Authorization 헤더를 자동으로 추가합니다.
 */
axios.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * 응답 인터셉터
 * 토큰 만료로 인한 401 에러 발생 시에만 토큰 리프레시를 시도하고 요청을 재시도합니다.
 */
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // 토큰 만료로 인한 401 에러인지 확인
    const isTokenExpiredError =
      error.response?.status === 401 &&
      error.response?.data?.error === ERROR_CODES.TOKEN_EXPIRED;

    // 토큰 만료 에러가 아니거나 이미 재시도했던 요청이면 에러를 그대로 반환
    if (!isTokenExpiredError || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 토큰 리프레시가 진행 중이 아닐 때만 새로운 리프레시를 시도
    if (!isRefreshing) {
      isRefreshing = true;
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newAccessToken);

        // 원래 요청을 새로운 토큰으로 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        return Promise.reject(error); // 원본 401 에러를 반환
      }
    }

    // 리프레시가 진행 중일 때는 새로운 Promise를 반환하여 토큰 리프레시 완료 후 처리
    return new Promise((resolve, reject) => {
      refreshSubscribers.push(token => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
  }
);

export default axios;
