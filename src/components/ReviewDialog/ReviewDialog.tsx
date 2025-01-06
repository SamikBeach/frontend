import { DialogProps } from '@radix-ui/react-dialog';
import { CommentEditor } from '../CommentEditor';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

interface Props extends DialogProps {}

export default function ReviewDialog({ children, ...props }: Props) {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="flex h-[94vh] w-[900px] min-w-[900px] flex-col gap-4 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <ReviewInfo />
        <CommentList />
        <CommentEditor />
      </DialogContent>
    </Dialog>
  );
}

ReviewDialog.Trigger = DialogTrigger;
