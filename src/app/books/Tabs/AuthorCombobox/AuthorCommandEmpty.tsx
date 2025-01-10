import { CommandEmpty } from '@/components/ui/command';
import { SearchX } from 'lucide-react';

export default function AuthorCommandEmpty() {
  return (
    <CommandEmpty>
      <div className="flex flex-col items-center gap-2 py-6">
        <SearchX className="h-10 w-10 text-gray-400" />
        <div className="text-sm font-medium">검색 결과가 없어요.</div>
        <div className="text-xs text-muted-foreground">
          다른 검색어로 다시 시도해보세요.
        </div>
      </div>
    </CommandEmpty>
  );
}
