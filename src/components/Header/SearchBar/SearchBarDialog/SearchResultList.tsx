import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { CommandGroup, CommandItem } from '@/components/ui/command';
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
          <CommandItem key={book.id}>
            <BookItem
              book={book}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(book.id)}
            />
          </CommandItem>
        ))}
      </CommandGroup>

      <CommandGroup heading="작가">
        {authors.map(author => (
          <CommandItem key={author.id}>
            <AuthorItem
              author={author}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(undefined, author.id)}
            />
          </CommandItem>
        ))}
      </CommandGroup>
    </>
  );
}
