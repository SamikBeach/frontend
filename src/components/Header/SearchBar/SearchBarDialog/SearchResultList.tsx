import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

interface Props {
  books?: Book[];
  authors?: Author[];
}

export default function SearchResultList({ books = [], authors = [] }: Props) {
  const hasResults = books.length > 0 || authors.length > 0;

  if (!hasResults) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-gray-500">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {books.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">책</h3>
          <div className="flex flex-col gap-1">
            {books.map(book => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

      {authors.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-gray-500">작가</h3>
          <div className="flex flex-col gap-1">
            {authors.map(author => (
              <AuthorItem key={author.id} author={author} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
