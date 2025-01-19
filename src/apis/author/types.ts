import { Book } from '../book/types';
import { BaseEntity, PaginationQuery } from '../common/types';

export interface Author extends BaseEntity {
  name: string;
  nameInKor: string;
  imageUrl: string | null;
  bornDate: string | null;
  bornDateIsBc: boolean | null;
  diedDate: string | null;
  diedDateIsBc: boolean | null;
  eraId: number | null;
  likeCount: number;
  reviewCount: number;
  bookCount: number;
  authorBooks: {
    book: Book;
  }[];
}

export interface AuthorDetail extends Author {
  isLiked: boolean;
}

export interface AuthorSearchQuery extends PaginationQuery {
  filter?: {
    era?: number;
    name?: string;
    nameInKor?: string;
    genre_id?: number;
  };
  searchBy?: ('name' | 'nameInKor' | 'genre_id')[];
}
