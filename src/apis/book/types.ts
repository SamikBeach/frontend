import { Author } from '../author';
import { BaseEntity, PaginationQuery } from '../common/types';

export interface Book extends BaseEntity {
  title: string;
  titleInEng: string | null;
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
  totalTranslationCount: number;
  originalWork: {
    id: number;
    title: string;
    titleInEng: string | null;
    author: {
      id: number;
      nameInKor: string;
      nameInEng: string | null;
    };
  } | null;
  genre: {
    id: number;
    name: string;
  } | null;
}

export interface BookDetail extends Book {
  isLiked: boolean;
}

export interface BookSearchQuery extends PaginationQuery {
  searchBy?: ('title' | 'description' | 'publisher' | 'isbn' | 'isbn13')[];
}
