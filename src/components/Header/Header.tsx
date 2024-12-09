import '@/styles/global.css';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';

export default function Header() {
  return (
    <header className="flex h-[56px] items-center justify-between border-b-[1px]">
      <LeftSlot />
      center
      <RightSlot />
    </header>
  );
}
