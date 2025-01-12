'use client';

import { BookCategory, bookCategoryAtom } from '@/atoms/book';
import { Button } from '@/components/ui/button';
import { CATEGORY_LABELS } from '@/constants/category';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';

export function CategoryButtons() {
  const { updateQueryParams } = useQueryParams();
  const [category, setCategory] = useAtom(bookCategoryAtom);

  const handleCategoryChange = (newCategory: BookCategory) => {
    setCategory(newCategory);
    updateQueryParams({ category: newCategory });
  };

  return (
    <div className="mr-4 flex gap-3">
      {(Object.entries(CATEGORY_LABELS) as [BookCategory, string][]).map(
        ([value, label]) => (
          <Button
            key={value}
            onClick={() => handleCategoryChange(value)}
            variant="ghost"
            className={`px-0 text-lg font-bold hover:bg-transparent ${
              category === value ? 'text-black' : 'text-gray-400'
            }`}
          >
            {label}
          </Button>
        )
      )}
    </div>
  );
}
