import { cn } from '@/lib/utils';
import { Home, Library, User } from 'lucide-react';

export default function LeftSidebar() {
  return (
    <div className="flex h-full w-[240px] flex-col bg-background">
      <div className="space-y-1 p-3">
        <MenuItem icon={<Home size={24} />} label="홈" />
        <MenuItem icon={<Library size={24} />} label="책" />
        <MenuItem icon={<User size={24} />} label="작가" />
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium',
        'hover:bg-accent hover:text-accent-foreground',
        active && 'bg-accent text-accent-foreground'
      )}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
