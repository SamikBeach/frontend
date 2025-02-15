'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewActions({ onEdit, onDelete }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" aria-label="더보기">
          <MoreHorizontal className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>수정</DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          onClick={onDelete}
        >
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
