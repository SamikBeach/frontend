import { Author } from '../author/types';
import axios from '../axios';
import { Book } from '../book/types';

interface SearchResponse {
  books: Book[];
  authors: Author[];
}

export const searchApi = {
  search: (keyword: string) =>
    axios.get<SearchResponse>('/search', {
      params: {
        keyword,
      },
    }),
};
