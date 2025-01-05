import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { EditIcon, Trash2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';

interface Props extends DropdownMenuProps {}

export default function EditDropdownMenu({ children, ...props }: Props) {
  return (
    <DropdownMenu {...props}>
      {children}
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={e => e.stopPropagation()}
        >
          <EditIcon className="h-4 w-4" />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-destructive hover:!bg-destructive hover:!text-destructive-foreground"
          onClick={e => e.stopPropagation()}
        >
          <Trash2Icon className="h-4 w-4" />
          삭제하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

EditDropdownMenu.Trigger = DropdownMenuTrigger;
