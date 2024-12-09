import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';

export default function Header() {
  return (
    <header className="h-[56px] flex items-center justify-between border-b-[1px]">
      <LeftSlot />
      center
      <RightSlot />
    </header>
  );
}
