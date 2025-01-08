import { Book } from '../book/types';
import { BaseEntity, PaginationQuery } from '../common/types';
import { User } from '../user/types';

export interface Review extends BaseEntity {
  title: string;
  content: string;
  user: User;
  book: Book;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
}

export interface CreateReviewDto {
  title: string;
  content: string;
}

export interface UpdateReviewDto {
  title?: string;
  content?: string;
}

export interface Comment extends BaseEntity {
  content: string;
  user: User;
  review: Review;
  likeCount: number;
  isLiked?: boolean;
}

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export interface ReviewSearchQuery extends PaginationQuery {
  filter?: {
    userId?: number;
    bookId?: number;
    minLikes?: number;
    title?: string;
    content?: string;
  };
  searchBy?: ('title' | 'content')[];
}

export interface CommentSearchQuery extends PaginationQuery {
  filter?: {
    userId?: number;
    reviewId?: number;
  };
}
