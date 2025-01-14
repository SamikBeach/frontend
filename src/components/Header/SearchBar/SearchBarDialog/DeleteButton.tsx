import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Props {
  onClick: (e: React.MouseEvent) => void;
}

export default function DeleteButton({ onClick }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 opacity-0 group-hover:opacity-100"
    >
      <X className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
}
