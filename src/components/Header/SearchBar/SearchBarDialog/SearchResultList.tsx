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
}

export default function SearchResultList({
  books,
  authors,
  onOpenChange,
  onItemClick,
}: Props) {
  console.log({ books });

  return (
    <>
      <CommandGroup heading="도서">
        {books.map(book => (
          <BookItem
            key={book.id}
            book={book}
            onOpenChange={onOpenChange}
            onClick={() => onItemClick(book.id)}
          />
        ))}
      </CommandGroup>

      <CommandGroup heading="작가">
        {authors.map(author => (
          <AuthorItem
            key={author.id}
            author={author}
            onOpenChange={onOpenChange}
            onClick={() => onItemClick(undefined, author.id)}
          />
        ))}
      </CommandGroup>
    </>
  );
}
