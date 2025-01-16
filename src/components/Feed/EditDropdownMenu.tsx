import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function EditDropdownMenu({ children }: Props) {
  return <DropdownMenu>{children}</DropdownMenu>;
}

EditDropdownMenu.Trigger = DropdownMenuTrigger;
EditDropdownMenu.Content = DropdownMenuContent;
EditDropdownMenu.Item = DropdownMenuItem;

export default EditDropdownMenu;
