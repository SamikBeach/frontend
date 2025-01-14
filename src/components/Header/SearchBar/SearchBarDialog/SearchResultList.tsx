import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { CommandGroup } from '@/components/ui/command';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

interface Props {
  books: Book[];
  authors: Author[];
  onOpenChange: (open: boolean) => void;
  onItemClick: (bookId?: number, authorId?: number) => void;
  searchValue: string;
}

export default function SearchResultList({
  books,
  authors,
  onOpenChange,
  onItemClick,
  searchValue,
}: Props) {
  return (
    <>
      {books.length > 0 && (
        <CommandGroup heading="도서">
          {books.map(book => (
            <BookItem
              key={book.id}
              book={book}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(book.id)}
              searchValue={searchValue}
            />
          ))}
        </CommandGroup>
      )}

      {authors.length > 0 && (
        <CommandGroup heading="작가">
          {authors.map(author => (
            <AuthorItem
              key={author.id}
              author={author}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(undefined, author.id)}
              searchValue={searchValue}
            />
          ))}
        </CommandGroup>
      )}
    </>
  );
}
