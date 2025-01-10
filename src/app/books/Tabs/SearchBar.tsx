import { bookSearchKeywordAtom } from '@/atoms/book';
import { Input } from '@/components/ui/input';
import { useAtom } from 'jotai';

export function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);

  return (
    <Input
      placeholder="Search"
      value={searchKeyword}
      onChange={e => setSearchKeyword(e.target.value)}
    />
  );
}
