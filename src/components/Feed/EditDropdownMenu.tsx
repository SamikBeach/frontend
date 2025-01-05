import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { EditIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import DeleteConfirmDialog from './DeleteConfirmDialog';

interface Props extends DropdownMenuProps {}

export default function EditDropdownMenu({ children, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false);

  return (
    <>
      <DropdownMenu {...props} open={open} onOpenChange={setOpen}>
        {children}
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <EditIcon className="h-4 w-4" />
            수정하기
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer text-destructive hover:!bg-red-50 hover:!text-destructive"
            onClickCapture={e => {
              e.stopPropagation();
              setOpen(false);
              setOpenDeleteConfirmDialog(true);
            }}
          >
            <Trash2Icon className="h-4 w-4" />
            삭제하기
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmDialog
        open={openDeleteConfirmDialog}
        onOpenChange={setOpenDeleteConfirmDialog}
      />
    </>
  );
}

EditDropdownMenu.Trigger = DropdownMenuTrigger;
