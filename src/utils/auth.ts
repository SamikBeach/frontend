const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * 액세스 토큰을 로컬 스토리지에 저장합니다.
 */
export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * 액세스 토큰을 로컬 스토리지에서 가져옵니다.
 */
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 액세스 토큰을 로컬 스토리지에서 제거합니다.
 */
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
