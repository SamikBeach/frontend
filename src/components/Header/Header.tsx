import '@/styles/global.css';
import { Input } from '../ui/input';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';

export default function Header() {
  return (
    <header className="flex h-[56px] items-center justify-between border-b-[1px] px-4">
      <LeftSlot />
      <Input
        className="max-w-96 rounded-full"
        placeholder="책이나 작가를 검색해 보세요..."
      />
      <RightSlot />
    </header>
  );
}
