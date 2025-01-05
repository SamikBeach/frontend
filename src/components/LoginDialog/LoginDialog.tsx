import { ComponentPropsWithoutRef } from 'react';
import { Logo } from '../Logo';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import LoginForm from './LoginForm';

interface Props extends ComponentPropsWithoutRef<typeof Dialog> {}

export default function LoginDialog(props: Props) {
  return (
    <Dialog {...props}>
      <DialogContent
        className="w-96"
        overlayClassName="bg-black/10"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex items-center py-6">
          <DialogTitle>
            <Logo />
          </DialogTitle>
        </DialogHeader>

        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.Trigger = DialogTrigger;
