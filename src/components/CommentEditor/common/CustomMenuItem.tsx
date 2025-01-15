import { UserAvatar } from '@/components/UserAvatar';
import { BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';

interface MentionUser {
  id: number;
  nickname: string;
  email: string;
  imageUrl?: string | null;
  type: 'user';
}

const CustomMenuItem = forwardRef<
  HTMLLIElement,
  BeautifulMentionsMenuItemProps
>(({ item, selected }, ref) => {
  const user = item.data as MentionUser;

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={selected}
      className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
        selected ? 'bg-gray-100' : ''
      }`}
    >
      <UserAvatar
        user={{
          id: user.id,
          nickname: user.nickname,
          email: user.email,
          imageUrl: user.imageUrl ?? null,
        }}
        size="sm"
      />
    </li>
  );
});

CustomMenuItem.displayName = 'CustomMenuItem';

export default CustomMenuItem;
