import { UserSearch } from '@/apis/user/types';
import { userApi } from '@/apis/user/user';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
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
    <div className="flex flex-col pt-2">
      <h3 className="px-2 text-sm font-semibold text-foreground">최근 검색</h3>
      <div className="space-y-1">
        {searches.map(search => {
          if (search.book) {
            return (
              <div key={search.id} className="group relative">
                <BookItem
                  book={search.book}
                  onOpenChange={onOpenChange}
                  onClick={() => onItemClick(search.book?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={e => handleDelete(search.id, e)}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            );
          }
          if (search.author) {
            return (
              <div key={search.id} className="group relative">
                <AuthorItem
                  author={search.author}
                  onOpenChange={onOpenChange}
                  onClick={() => onItemClick(undefined, search.author?.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={e => handleDelete(search.id, e)}
                  className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
