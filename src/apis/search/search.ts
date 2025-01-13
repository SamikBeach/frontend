import { Author } from '../author/types';
import { axiosInstance } from '../axios';
import { Book } from '../book/types';

interface SearchResponse {
  books: Book[];
  authors: Author[];
}

export const searchApi = {
  search: (keyword: string) =>
    axiosInstance.get<SearchResponse>('/search', {
      params: {
        keyword,
      },
    }),
};
