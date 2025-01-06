import { DialogProps } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import AuthorInfo from './AuthorInfo';
import RelativeAuthors from './RelativeBooks';

interface Props extends DialogProps {}

export default function AuthorDialog({ children, ...props }: Props) {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="flex h-[94vh] w-[900px] min-w-[900px] flex-col gap-8 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <AuthorInfo />
        <RelativeAuthors />
      </DialogContent>
    </Dialog>
  );
}

AuthorDialog.Trigger = DialogTrigger;
