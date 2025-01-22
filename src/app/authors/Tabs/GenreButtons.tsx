'use client';

import { authorGenreAtom } from '@/atoms/author';
import { Button } from '@/components/ui/button';
import { GENRE_LABELS } from '@/constants/genre';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Genre } from '@/types/genre';
import { useAtom } from 'jotai';

export function GenreButtons() {
  const { updateQueryParams } = useQueryParams();
  const [genre, setGenre] = useAtom(authorGenreAtom);

  const handleGenreChange = (newGenre: Genre) => {
    if (newGenre === 'science' || newGenre === 'economics') {
      alert('준비 중이에요.');
      return;
    }

    setGenre(newGenre);
    updateQueryParams({ genre: newGenre });
  };

  return (
    <div className="flex gap-2 md:mr-4">
      {(Object.entries(GENRE_LABELS) as [Genre, string][]).map(
        ([value, label]) => (
          <Button
            key={value}
            onClick={() => handleGenreChange(value)}
            variant="ghost"
            className={`whitespace-nowrap px-0 text-base font-bold hover:bg-transparent md:text-lg ${
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
