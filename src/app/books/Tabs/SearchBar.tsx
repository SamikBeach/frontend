'use client';

import { bookSearchKeywordAtom } from '@/atoms/book';
import { Input } from '@/components/ui/input';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { debounce } from 'lodash-es';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

export function SearchBar() {
  const { updateQueryParams } = useQueryParams();
  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);
  const [inputValue, setInputValue] = useState(searchKeyword);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchKeyword(value);
      updateQueryParams({ q: value });
    }, 300),
    [setSearchKeyword, updateQueryParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="책 제목 검색"
        value={inputValue}
        onChange={handleChange}
        className="w-[300px] pl-8"
      />
    </div>
  );
}
