'use client';

import { bookGenreAtom } from '@/atoms/book';
import { Button } from '@/components/ui/button';
import { GENRE_LABELS } from '@/constants/genre';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Genre } from '@/types/genre';
import { useAtom } from 'jotai';

export function GenreButtons() {
  const { updateQueryParams } = useQueryParams();
  const [genre, setGenre] = useAtom(bookGenreAtom);

  const handleGenreChange = (newGenre: Genre) => {
    if (newGenre === 'science' || newGenre === 'economics') {
      alert('준비 중이에요.');
      return;
    }

    setGenre(newGenre);
    updateQueryParams({ genre: newGenre });
  };

  return (
    <div className="mr-4 flex gap-2">
      {(Object.entries(GENRE_LABELS) as [Genre, string][]).map(
        ([value, label]) => (
          <Button
            key={value}
            onClick={() => handleGenreChange(value)}
            variant="ghost"
            className={`px-0 text-lg font-bold hover:bg-transparent ${
              genre === value ? 'text-black' : 'text-gray-400'
            }`}
          >
            {label}
          </Button>
        )
      )}
    </div>
  );
}
