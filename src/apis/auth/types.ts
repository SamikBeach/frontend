export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface EmailVerificationDto {
  email: string;
}

export interface VerifyEmailDto {
  email: string;
  code: string;
}

export interface EmailCheckResponse {
  available: boolean;
}

export interface EmailVerificationResponse {
  verified: boolean;
}

export interface LogoutResponse {
  message: string;
  action: string;
}

export interface TokenRefreshResponse {
  accessToken: string;
}
