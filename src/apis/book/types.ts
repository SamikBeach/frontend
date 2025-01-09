import { Author } from '../author/types';
import { BaseEntity, PaginationQuery } from '../common/types';

export interface Book extends BaseEntity {
  title: string;
  description: string | null;
  imageUrl: string | null;
  publisher: string | null;
  publicationDate: string | null;
  isbn: number | null;
  isbn13: number | null;
  likeCount: number;
  reviewCount: number;
  authorBooks: Author[];
}

export interface BookDetail extends Book {
  isLiked: boolean;
}

export interface BookSearchQuery extends PaginationQuery {
  filter?: {
    publisher?: string;
    publicationDate?: string;
    authorId?: number;
    isbn?: number;
    isbn13?: number;
  };
  searchBy?: ('title' | 'description' | 'publisher' | 'isbn' | 'isbn13')[];
}
