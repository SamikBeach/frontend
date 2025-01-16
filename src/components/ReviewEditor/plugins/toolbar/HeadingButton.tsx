import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

interface Props {
  tooltip: string;
  onClick: () => void;
  icon: LucideIcon;
  ariaLabel: string;
}

export function HeadingButton({
  tooltip,
  onClick,
  icon: Icon,
  ariaLabel,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
