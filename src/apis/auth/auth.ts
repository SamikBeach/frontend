import axios from '../axios';
import type {
  AuthResponse,
  EmailVerificationDto,
  LoginDto,
  RegisterDto,
  TokenRefreshResponse,
  VerifyEmailDto,
} from './types';

export const authApi = {
  /**
   * 이메일/비밀번호로 로그인합니다.
   * @param data - 이메일과 비밀번호
   * @returns 액세스 토큰이 포함된 응답
   */
  login: (data: LoginDto) =>
    axios.post<AuthResponse>('/auth/login/email', data),

  /**
   * 현재 로그인된 사용자를 로그아웃합니다.
   * 리프레시 토큰이 쿠키에서 제거됩니다.
   */
  logout: () => axios.post<void>('/auth/logout'),

  /**
   * 구글 OAuth 인증 코드로 로그인합니다.
   * @param code - 구글 OAuth 인증 코드
   * @returns 액세스 토큰이 포함된 응답
   */
  googleLogin: (code: string) =>
    axios.post<AuthResponse>('/auth/login/google', { code }),

  /**
   * 이메일 주소의 사용 가능 여부를 확인합니다.
   * @param data - 확인할 이메일 주소
   * @returns 이메일 사용 가능 여부
   */
  checkEmail: (data: EmailVerificationDto) =>
    axios.post<{ available: boolean }>('/auth/register/check-email', data),

  /**
   * 이메일 인증 코드를 발송합니다.
   * @param data - 인증 코드를 받을 이메일 주소
   */
  sendVerificationEmail: (data: EmailVerificationDto) =>
    axios.post<void>('/auth/email/verify/send', data),

  /**
   * 이메일 인증 코드를 확인합니다.
   * @param data - 이메일 주소와 인증 코드
   */
  verifyEmail: (data: VerifyEmailDto) =>
    axios.post<void>('/auth/email/verify', data),

  /**
   * 회원가입을 시작하고 사용자 정보를 임시 저장합니다.
   * @param data - 회원가입에 필요한 사용자 정보
   */
  initiateRegistration: (data: RegisterDto) =>
    axios.post<void>('/auth/register/initiate', data),

  /**
   * 이메일 인증 후 회원가입을 완료합니다.
   * @param data - 인증된 이메일 주소
   * @returns 액세스 토큰이 포함된 응답
   */
  completeRegistration: (data: { email: string }) =>
    axios.post<AuthResponse>('/auth/register/complete', data),

  /**
   * 리프레시 토큰으로 새로운 액세스 토큰을 발급받습니다.
   * 리프레시 토큰은 쿠키에서 자동으로 전송됩니다.
   * @returns 새로운 액세스 토큰
   */
  refresh: () => axios.post<TokenRefreshResponse>('/auth/refresh'),
};
