import '@/styles/global.css';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';
import SearchBar from './SearchBar/SearchBar';

export default function Header() {
  return (
    <header className="flex h-[56px] items-center justify-between border-b-[1px] px-4">
      <LeftSlot />
      <SearchBar />
      <RightSlot />
    </header>
  );
}
