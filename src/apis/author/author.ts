import { transformFilterParams } from '@/utils/api';
import axios from '../axios';
import type { Book } from '../book/types';
import type {
  ChatRequest,
  ChatWithAuthorResponse,
  PaginatedResponse,
  PaginationQuery,
  YouTubeVideo,
} from '../common/types';
import { Review } from '../review/types';
import type {
  Author,
  AuthorDetail,
  AuthorSearchQuery,
  InfluencedAuthor,
  OriginalWork,
} from './types';

export const authorApi = {
  /**
   * 작가 목록을 검색합니다.
   * @param params - 검색 조건 (이름, 시대 등으로 필터링 가능)
   * @returns 페이지네이션된 작가 목록
   */
  searchAuthors: (params: AuthorSearchQuery) =>
    axios.get<PaginatedResponse<Author>>('/author/search', {
      params: transformFilterParams(params),
    }),

  /**
   * 모든 작가 목록을 가져옵니다.
   * @returns 전체 작가 목록
   */
  getAllAuthors: () => axios.get<Author[]>('/author'),

  /**
   * 특정 작가의 상세 정보를 조회합니다.
   * @param authorId - 작가 ID
   * @returns 작가 상세 정보 (좋아요 여부 포함)
   */
  getAuthorDetail: (authorId: number) =>
    axios.get<AuthorDetail>(`/author/${authorId}`),

  /**
   * 작가 좋아요를 토글합니다.
   * @param authorId - 작가 ID
   * @returns 토글 후 좋아요 상태
   */
  toggleAuthorLike: (authorId: number) =>
    axios.post<{ liked: boolean }>(`/author/${authorId}/like`),

  /**
   * 특정 작가의 모든 책 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @returns 책 목록
   */
  getAllAuthorBooks: (authorId: number) =>
    axios.get<Book[]>(`/author/${authorId}/books`),

  /**
   * 특정 작가의 리뷰 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  getAuthorReviews: (authorId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>(`/author/${authorId}/reviews`, {
      params,
    }),

  /**
   * 작가가 영향을 준 작가 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @returns 영향을 받은 작가 목록
   */
  getInfluencedAuthors: (authorId: number) =>
    axios.get<InfluencedAuthor[]>(`/author/${authorId}/influenced`),

  /**
   * 작가가 영향을 받은 작가 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @returns 영향을 준 작가 목록
   */
  getInfluencedByAuthors: (authorId: number) =>
    axios.get<InfluencedAuthor[]>(`/author/${authorId}/influenced-by`),

  /**
   * 작가 관련 YouTube 동영상을 가져옵니다.
   * @param authorId - 작가 ID
   * @param maxResults - 최대 결과 수 (기본값: 5)
   * @returns YouTube 동영상 목록
   */
  getAuthorVideos: (authorId: number, maxResults = 5) =>
    axios.get<YouTubeVideo[]>(`/author/${authorId}/videos`, {
      params: { maxResults },
    }),

  /**
   * 작가의 원전 작품 목록을 가져옵니다.
   * @param authorId - 작가 ID
   * @returns 원전 작품 목록
   */
  getAuthorOriginalWorks: (authorId: number) => {
    return axios.get<OriginalWork[]>(`/author/${authorId}/original-works`);
  },

  /**
   * 작가와 대화합니다.
   * @param authorId - 작가 ID
   * @param request - 채팅 메시지 및 대화 기록
   * @param signal - AbortSignal 객체 (요청 취소용)
   * @returns AI 응답
   */
  chatWithAuthor: (
    authorId: number,
    request: ChatRequest,
    signal?: AbortSignal
  ) =>
    axios.post<ChatWithAuthorResponse>(`/author/${authorId}/chat`, request, {
      signal,
    }),
};
