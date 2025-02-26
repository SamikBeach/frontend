// 공통 응답 타입
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
    searchBy?: string[];
    search?: string;
    filter?: Record<string, any>;
  };
  links: {
    first?: string;
    previous?: string;
    current: string;
    next?: string;
    last?: string;
  };
}

// 기본 엔티티 타입
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

// 공통 쿼리 파라미터
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  filter?: Record<string, any>;
}

// 좋아요 토글 응답
export interface LikeToggleResponse {
  liked: boolean;
}

// 삭제 응답
export interface DeleteResponse {
  message: string;
}

// YouTube 비디오 정보
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
}
