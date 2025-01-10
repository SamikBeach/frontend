'use client';

import { authorSearchKeywordAtom } from '@/atoms/author';
import { Input } from '@/components/ui/input';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAtom } from 'jotai';
import { SearchIcon } from 'lucide-react';

export function SearchBar() {
  const { updateQueryParams } = useQueryParams();
  const [searchKeyword, setSearchKeyword] = useAtom(authorSearchKeywordAtom);

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        className="w-[240px] pl-9"
        placeholder="작가 검색"
        value={searchKeyword}
        onChange={e => {
          setSearchKeyword(e.target.value);
          updateQueryParams({ q: e.target.value || undefined });
        }}
      />
    </div>
  );
}
