import { UserSearch } from '@/apis/user/types';
import { userApi } from '@/apis/user/user';
import { CommandGroup } from '@/components/ui/command';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

interface Props {
  searches: UserSearch[];
  onOpenChange: (open: boolean) => void;
  onItemClick: (bookId?: number, authorId?: number) => void;
}

export default function RecentSearchList({
  searches,
  onOpenChange,
  onItemClick,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate: deleteSearch } = useMutation({
    mutationFn: userApi.deleteSearch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recentSearches'] });
    },
  });

  const handleDelete = (searchId: number, e: React.MouseEvent) => {
    e.preventDefault();
    deleteSearch(searchId);
  };

  return (
    <CommandGroup heading="최근 검색">
      {searches.map(search => {
        if (search.book) {
          return (
            <BookItem
              key={search.id}
              book={search.book}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(search.book?.id)}
              onDelete={e => handleDelete(search.id, e)}
            />
          );
        }
        if (search.author) {
          return (
            <AuthorItem
              key={search.id}
              author={search.author}
              onOpenChange={onOpenChange}
              onClick={() => onItemClick(undefined, search.author?.id)}
              onDelete={e => handleDelete(search.id, e)}
            />
          );
        }
        return null;
      })}
    </CommandGroup>
  );
}
