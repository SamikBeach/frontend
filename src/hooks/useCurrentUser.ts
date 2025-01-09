import { currentUserAtom } from '@/atoms/auth';
import { useAtomValue } from 'jotai';

export function useCurrentUser() {
  const currentUser = useAtomValue(currentUserAtom);
  return currentUser;
}
