import { BaseEntity, PaginationQuery } from '../common/types';

export interface Author extends BaseEntity {
  name: string;
  nameInKor: string;
  imageUrl: string | null;
  bornDate: string | null;
  bornDateIsBc: boolean;
  diedDate: string | null;
  diedDateIsBc: boolean;
  eraId: number | null;
  likeCount: number;
  reviewCount: number;
}

export interface AuthorDetail extends Author {
  isLiked: boolean;
}

export interface AuthorSearchQuery extends PaginationQuery {
  filter?: {
    era?: number;
    name?: string;
    nameInKor?: string;
  };
  searchBy?: ('name' | 'nameInKor')[];
}
