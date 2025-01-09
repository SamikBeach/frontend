import { STORAGE_KEYS } from '@/constants/storage-keys';
import originalAxios from 'axios';

const axios = originalAxios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

// 요청 인터셉터 추가
axios.interceptors.request.use(config => {
  // localStorage에서 토큰 가져오기
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axios;
