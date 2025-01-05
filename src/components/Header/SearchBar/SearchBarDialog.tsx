import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogProps } from '@radix-ui/react-dialog';
import SearchBarDialogContent from './SearchBarDialogContent';

interface Props extends DialogProps {}

export default function SearchBarDialog({ children, ...props }: Props) {
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
        />
        <DialogTitle />
        <SearchBarDialogContent />
      </DialogContent>
    </Dialog>
  );
}

SearchBarDialog.Trigger = DialogTrigger;
