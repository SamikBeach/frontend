import { atom } from 'jotai';

// 액세스 토큰 atom
export const accessTokenAtom = atom<string | null>(null);

// 로그인 여부를 나타내는 atom
export const isLoggedInAtom = atom(get => !!get(accessTokenAtom));
