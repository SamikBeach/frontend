import { BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';

interface Props extends BeautifulMentionsMenuItemProps {}

const CustomMenuItem = forwardRef<HTMLLIElement, Props>(
  ({ item, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={`flex h-7 w-[200px] items-center gap-2 rounded px-1 text-sm ${props.selected ? 'bg-gray-100' : ''}`}
        {...props}
      >
        {item.value}
      </li>
    );
  }
);

export default CustomMenuItem;
