import { BaseEntity, PaginationQuery } from '../common/types';

export interface User extends Omit<BaseEntity, 'deletedAt'> {
  email: string;
  nickname: string;
  verified: boolean;
}

export type UserBase = Pick<User, 'id' | 'email' | 'nickname'>;

export interface UpdateUserDto {
  nickname?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UserSearchQuery extends PaginationQuery {
  filter?: {
    verified?: boolean;
    email?: string;
    nickname?: string;
  };
}
