import { searchKeywordAtom } from '@/atoms/search';
import { Command, CommandInput } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogProps, DialogTitle } from '@radix-ui/react-dialog';
import { useAtom } from 'jotai';
import { debounce } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import SearchBarDialogContent from './SearchBarDialogContent';

interface Props extends Omit<DialogProps, 'open'> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchBarDialog({
  open,
  onOpenChange,
  ...props
}: Props) {
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const [inputValue, setInputValue] = useState(searchKeyword);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchKeyword(value);
    }, 300),
    [setSearchKeyword]
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchKeyword('');
      setInputValue('');
    }
    onOpenChange(open);
  };

  return (
    <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="top-[6px] w-[600px] translate-y-0 gap-1 bg-white p-2 sm:max-w-[600px]"
        overlayClassName="bg-black/10"
        closeClassName="hidden"
        aria-describedby={undefined}
      >
        <Command shouldFilter={false}>
          <DialogTitle className="hidden" />
          <CommandInput
            className="h-10 w-full border-0 bg-transparent text-sm focus-visible:ring-0"
            placeholder="책이나 작가를 검색하세요."
            value={inputValue}
            onValueChange={handleChange}
          />
          <SearchBarDialogContent
            keyword={searchKeyword}
            onOpenChange={handleOpenChange}
          />
        </Command>
      </DialogContent>
    </Dialog>
  );
}
