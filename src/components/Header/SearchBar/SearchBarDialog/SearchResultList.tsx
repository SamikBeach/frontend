import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

interface Props {
  books?: Book[];
  authors?: Author[];
  onOpenChange: (open: boolean) => void;
}

export default function SearchResultList({
  books = [],
  authors = [],
  onOpenChange,
}: Props) {
  const hasResults = books.length > 0 || authors.length > 0;

  if (!hasResults) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <p className="text-sm text-muted-foreground">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-2">
      {books.length > 0 && (
        <div>
          <h3 className="px-2 text-sm font-semibold text-foreground">책</h3>
          <div className="flex flex-col">
            {books.map(book => (
              <BookItem key={book.id} book={book} onOpenChange={onOpenChange} />
            ))}
          </div>
        </div>
      )}

      {authors.length > 0 && (
        <div>
          <h3 className="px-2 text-sm font-semibold text-foreground">작가</h3>
          <div className="flex flex-col">
            {authors.map(author => (
              <AuthorItem
                key={author.id}
                author={author}
                onOpenChange={onOpenChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
