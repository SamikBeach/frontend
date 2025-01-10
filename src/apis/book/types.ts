import { Author } from '../author';
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
  authorBooks: {
    id: number;
    authorId: number;
    bookId: number;
    author: Author;
  }[];
}

export interface BookDetail extends Book {
  isLiked: boolean;
}

export interface BookSearchQuery extends PaginationQuery {
  filter?: {
    title?: string;
    publisher?: string;
    publicationDate?: string;
    isbn?: number;
    isbn13?: number;
    'authorBooks.author.id'?: number;
  };
  searchBy?: ('title' | 'description' | 'publisher' | 'isbn' | 'isbn13')[];
}
