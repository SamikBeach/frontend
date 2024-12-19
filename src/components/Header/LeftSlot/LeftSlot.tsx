import { Logo } from '@/components/Logo';
import Link from 'next/link';

export default function LeftSlot() {
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
}
