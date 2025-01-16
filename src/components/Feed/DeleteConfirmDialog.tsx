import { AlertDialogProps } from '@radix-ui/react-alert-dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface Props extends AlertDialogProps {}

export default function DeleteConfirmDialog({ children, ...props }: Props) {
  return (
    <AlertDialog {...props}>
      {children}
      <AlertDialogContent>
        <AlertDialogTitle>정말로 삭제할까요?</AlertDialogTitle>
        <AlertDialogDescription>
          삭제하면 복구할 수 없어요.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

DeleteConfirmDialog.Trigger = AlertDialogTrigger;
