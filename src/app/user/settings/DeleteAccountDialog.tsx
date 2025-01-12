'use client';

import { userApi } from '@/apis/user/user';
import { currentUserAtom } from '@/atoms/auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { AlertTriangle, UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

interface Props extends DialogProps {}

export default function DeleteAccountDialog({ children, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const router = useRouter();
  const setCurrentUser = useSetAtom(currentUserAtom);

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: userApi.deleteAccount,
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      setCurrentUser(null);
      router.push('/');
      toast.success('계정이 삭제되었습니다.');
    },
  });

  const handleDelete = () => {
    if (confirmText !== '삭제') return;
    deleteAccount();
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);

    if (!open) {
      setConfirmText('');
    }
  };

  return (
    <>
      <Dialog {...props} open={open} onOpenChange={handleOpenChange}>
        {children}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-destructive/10 p-2">
                <UserX className="h-6 w-6 text-destructive" />
              </div>
              <DialogTitle>계정 삭제</DialogTitle>
            </div>
          </DialogHeader>

          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-start gap-4 rounded-lg border border-destructive/50 bg-destructive/5 p-4">
              <AlertTriangle className="mt-1 h-5 w-5 text-destructive" />
              <div className="space-y-1">
                <p className="font-medium text-destructive">
                  삭제 전 꼭 확인해 주세요
                </p>
                <ul className="list-inside list-disc text-sm text-destructive/90">
                  <li>모든 리뷰 기록이 삭제돼요.</li>
                  <li>북마크한 책과 작가 정보가 삭제돼요.</li>
                  <li>삭제된 계정은 복구할 수 없어요.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">
                계정 삭제를 원하시면 아래에 &apos;삭제&apos;를 입력해 주세요.
              </p>
              <Input
                id="confirm-delete"
                placeholder="삭제"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="destructive"
              className="w-full"
              disabled={confirmText !== '삭제' || isPending}
              onClick={handleDelete}
            >
              {isPending ? '삭제 중...' : '계정 영구 삭제하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}

DeleteAccountDialog.Trigger = DialogTrigger;
