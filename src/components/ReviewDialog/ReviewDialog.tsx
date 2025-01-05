import { DialogProps, DialogTitle } from '@radix-ui/react-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface Props extends DialogProps {}

export default function ReviewDialog({ children, ...props }: Props) {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent
        overlayClassName="bg-black/10"
        className="h-[94vh] w-[900px] min-w-[900px] overflow-y-auto"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <DialogTitle className="text-2xl font-bold">
          차라투스트라 읽지마세요
        </DialogTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788970132099.jpg"
              className="h-[40px] rounded-sm"
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">
                차라투스트라는 이렇게 말했다
              </p>
              <p className="text-xs text-gray-500">
                프리드리히 니체 · 민음사 · 2021
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium">BonggeunJeong</p>
          </div>
          <p className="text-gray-500">2021년 3월 12일 수요일 12시 33분 11초</p>
        </div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </DialogContent>
    </Dialog>
  );
}

ReviewDialog.Trigger = DialogTrigger;
