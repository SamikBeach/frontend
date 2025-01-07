import { BeautifulMentionsMenuProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';

const CustomMenu = forwardRef<HTMLUListElement, BeautifulMentionsMenuProps>(
  ({ loading, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        autoFocus
        className="absolute bottom-10 z-50 max-h-60 cursor-pointer overflow-y-auto rounded-lg bg-white p-1.5 shadow-[0_0_0_1px_rgba(0,0,0,0.1),_0_4px_6px_rgba(0,0,0,0.1)]"
        {...props}
      />
    );
  }
);

export default CustomMenu;
