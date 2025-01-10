import { bookSearchKeywordAtom } from '@/atoms/book';
import { AuthorCombobox } from '@/components/AuthorCombobox';
import { Input } from '@/components/ui/input';
import { useAtom } from 'jotai';

export function SearchBar() {
  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search"
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      <AuthorCombobox />
    </div>
  );
}
