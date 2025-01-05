import '@/styles/global.css';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';
import { SearchBar } from './SearchBar';

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex min-h-[56px] items-center justify-between border-b-[1px] bg-white px-4">
      <LeftSlot />
      <SearchBar />
      <RightSlot />
    </header>
  );
}
