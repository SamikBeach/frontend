import type { Author } from '../author/types';
import axios from '../axios';
import type { Book } from '../book/types';
import type { PaginatedResponse, PaginationQuery } from '../common/types';
import type { Review } from '../review/types';
import type {
  UpdateUserDto,
  User,
  UserProfile,
  UserSearchQuery,
} from './types';

export const userApi = {
  /**
   * 현재 로그인한 사용자의 프로필 정보를 조회합니다.
   * @returns 사용자 프로필 정보 (리뷰 수, 좋아요한 작가/책 수 포함)
   */
  getMyProfile: () => axios.get<UserProfile>('/user/me'),

  /**
   * 현재 로그인한 사용자의 정보를 수정합니다.
   * @param data - 수정할 정보 (닉네임 또는 비밀번호)
   * @returns 수정된 사용자 정보
   */
  updateProfile: (data: UpdateUserDto) => axios.patch<User>('/user/me', data),

  /**
   * 현재 로그인한 사용자의 계정을 삭제합니다.
   */
  deleteAccount: () => axios.delete<void>('/user/me'),

  /**
   * 사용자 목록을 검색합니다.
   * @param params - 검색 조건 (이메일, 닉네임, 인증 여부 등으로 필터링 가능)
   * @returns 페이지네이션된 사용자 목록
   */
  searchUsers: (params: UserSearchQuery) =>
    axios.get<PaginatedResponse<User>>('/user/search', { params }),

  /**
   * 현재 로그인한 사용자가 좋아요한 책 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 책 목록
   */
  searchFavoriteBooks: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<Book>>('/user/me/books', { params }),

  /**
   * 현재 로그인한 사용자가 좋아요한 작가 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 작가 목록
   */
  searchFavoriteAuthors: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<Author>>('/user/me/authors', { params }),

  /**
   * 현재 로그인한 사용자가 작성한 리뷰 목록을 조회합니다.
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  searchMyReviews: (params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>('/user/me/reviews', { params }),
};
