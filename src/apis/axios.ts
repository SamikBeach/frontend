import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true, // refreshToken을 쿠키로 주고받기 위해 필요
});

export default instance;
