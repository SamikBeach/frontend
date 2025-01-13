import { searchKeywordAtom } from '@/atoms/search';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogProps } from '@radix-ui/react-dialog';
import { useAtom } from 'jotai';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import SearchBarDialogContent from './SearchBarDialogContent';

interface Props extends DialogProps {}

export default function SearchBarDialog({ children, ...props }: Props) {
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [inputValue, setInputValue] = useState(searchKeyword);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchKeyword(value);
    }, 300),
    [setSearchKeyword]
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
    <Dialog {...props}>
      {children}
      <DialogContent
        className="top-[6px] w-[600px] translate-y-0 gap-1 bg-white p-3 sm:max-w-[600px]"
        overlayClassName="bg-black/10"
        closeClassName="hidden"
        aria-describedby={undefined}
      >
        <Input
          className="border-0 bg-gray-100 focus-visible:ring-0"
          placeholder="책이나 작가를 검색하세요."
          value={inputValue}
          onChange={handleChange}
        />
        <DialogTitle />
        <SearchBarDialogContent keyword={searchKeyword} />
      </DialogContent>
    </Dialog>
  );
}

SearchBarDialog.Trigger = DialogTrigger;
