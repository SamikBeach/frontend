import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface Props {
  tooltip: string;
  onClick: () => void;
  icon: LucideIcon;
  ariaLabel: string;
  isActive?: boolean;
}

export function TextFormatButton({
  tooltip,
  onClick,
  icon: Icon,
  ariaLabel,
  isActive = false,
}: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          size="sm"
          pressed={isActive}
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(
            'h-8 w-8 border-0 hover:bg-accent hover:text-accent-foreground',
            isActive && 'bg-accent text-accent-foreground'
          )}
        >
          <Icon className="h-4 w-4" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
