import type { Author } from '../author/types';
import axios from '../axios';
import type { Book } from '../book/types';
import type { PaginatedResponse, PaginationQuery } from '../common/types';
import type { Review } from '../review/types';
import type { ChangePasswordDto, UpdateUserDto, User, UserBase } from './types';

export const userApi = {
  /**
   * 내 프로필 정보를 조회합니다.
   * @returns 내 프로필 정보
   */
  getMyProfile: () => axios.get<UserBase>('/user/me'),

  /**
   * 사용자 상세 정보를 조회합니다.
   * @param userId - 사용자 ID
   * @returns 사용자 상세 정보
   */
  getUserDetail: (userId: number) => axios.get<User>(`/user/${userId}`),

  /**
   * 프로필 정보를 수정합니다.
   * @param data - 수정할 프로필 정보
   * @returns 수정된 프로필 정보
   */
  updateProfile: (data: UpdateUserDto) => axios.patch<User>('/user/me', data),

  /**
   * 회원 탈퇴를 처리합니다.
   * 계정이 삭제되면 자동으로 로그아웃되며 리프레시 토큰이 제거됩니다.
   * @throws {NotFoundException} 사용자를 찾을 수 없는 경우
   */
  deleteAccount: () => axios.delete<void>('/user/me'),

  /**
   * 사용자를 검색합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 사용자 목록
   */
  searchUsers: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<User>>('/user/search', { params }),

  /**
   * 특정 사용자의 좋아요한 책 목록을 조회합니다.
   * @param userId - 사용자 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 책 목록
   */
  getUserLikedBooks: (userId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<{ book: Book }>>(`/user/${userId}/books`, {
      params,
    }),

  /**
   * 특정 사용자의 좋아요한 작가 목록을 조회합니다.
   * @param userId - 사용자 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 작가 목록
   */
  getUserLikedAuthors: (userId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<{ author: Author }>>(
      `/user/${userId}/authors`,
      { params }
    ),

  /**
   * 특정 사용자의 리뷰 목록을 조회합니다.
   * @param userId - 사용자 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  getUserReviews: (userId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>(`/user/${userId}/reviews`, { params }),

  /**
   * 내가 좋아요한 책 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 책 목록
   */
  getMyLikedBooks: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<{ book: Book }>>('/user/me/books', { params }),

  /**
   * 내가 좋아요한 작가 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 작가 목록
   */
  getMyLikedAuthors: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<{ author: Author }>>('/user/me/authors', {
      params,
    }),

  /**
   * 내가 작성한 리뷰 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  getMyReviews: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>('/user/me/reviews', { params }),

  /**
   * 비밀번호를 변경합니다.
   * @param data - 현재 비밀번호와 새로운 비밀번호
   * @returns 비밀번호 변경 성공 메시지
   */
  changePassword: (data: ChangePasswordDto) =>
    axios.post<{ message: string }>('/user/me/password', data),
};
