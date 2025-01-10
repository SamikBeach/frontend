import { bookSearchKeywordAtom } from '@/atoms/book';
import { Input } from '@/components/ui/input';
import { useAtom } from 'jotai';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';

export function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);
  const [inputValue, setInputValue] = useState(searchKeyword);

  const debouncedSetSearchKeyword = useCallback(
    debounce((value: string) => {
      setSearchKeyword(value);
    }, 300),
    [setSearchKeyword]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchKeyword(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchKeyword.cancel();
    };
  }, [debouncedSetSearchKeyword]);

  return (
    <Input placeholder="Search" value={inputValue} onChange={handleChange} />
  );
}
