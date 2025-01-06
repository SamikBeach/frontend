import { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import BookInfo from './BookInfo';

interface Props extends DialogProps {}

export default function BookDialog({ children, ...props }: Props) {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="h-[94vh] w-[900px] min-w-[900px] gap-2 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <BookInfo />
      </DialogContent>
    </Dialog>
  );
}

BookDialog.Trigger = DialogTrigger;
