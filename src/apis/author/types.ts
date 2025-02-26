import { Book } from '../book/types';
import { BaseEntity, PaginationQuery } from '../common/types';
import { Genre } from '../genre/types';

export interface OriginalWork extends BaseEntity {
  title: string;
  titleInEng?: string;
  titleInKor?: string;
  publicationDate?: string;
  publicationDateIsBc?: boolean;
  posthumous?: boolean;
  circa?: boolean;
  century?: boolean;
  s?: boolean;
  books?: Book[];
}

export interface Author extends BaseEntity {
  name: string;
  nameInKor: string;
  imageUrl: string | null;
  description: string | null;
  bornDate: string | null;
  bornDateIsBc: boolean | null;
  diedDate: string | null;
  diedDateIsBc: boolean | null;
  eraId: number | null;
  likeCount: number;
  reviewCount: number;
  bookCount: number;
  genre: Genre;
  authorBooks: {
    book: Book;
  }[];
  userAuthorLikes: {
    id: number;
    userId: number;
  }[];
  authorOriginalWorks: {
    id: number;
    title: string;
  }[];
  originalWorks?: OriginalWork[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthorDetail extends Author {
  isLiked: boolean;
}

export interface InfluencedAuthor extends Author {
  isWikiData: boolean;
}

export interface AuthorSearchQuery extends PaginationQuery {
  filter?: {
    eraId?: number;
    name?: string;
    nameInKor?: string;
    genre_id?: number;
  };
  searchBy?: ('name' | 'nameInKor' | 'genre_id')[];
}
