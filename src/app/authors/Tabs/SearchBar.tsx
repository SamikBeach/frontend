'use client';

import { authorSearchKeywordAtom } from '@/atoms/author';
import { Input } from '@/components/ui/input';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { debounce } from 'lodash-es';
import { SearchIcon, X } from 'lucide-react';
import { useCallback, useEffect } from 'react';

export function SearchBar() {
  const { updateQueryParams } = useQueryParams();
  const [searchKeyword, setSearchKeyword] = useAtom(authorSearchKeywordAtom);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchKeyword(value);
      updateQueryParams({ q: value || undefined });
    }, 300),
    [setSearchKeyword, updateQueryParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchKeyword('');
    updateQueryParams({ q: undefined });
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="작가 검색"
        value={searchKeyword}
        onChange={handleChange}
        className="w-[240px] pl-9"
      />
      {searchKeyword && (
        <div
          className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-gray-200"
          onClick={handleClear}
        >
          <X className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100" />
        </div>
      )}
    </div>
  );
}
