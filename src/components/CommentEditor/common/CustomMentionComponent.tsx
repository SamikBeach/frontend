import { BeautifulMentionComponentProps } from 'lexical-beautiful-mentions';
import { forwardRef } from 'react';

const CustomMentionComponent = forwardRef<
  HTMLDivElement,
  BeautifulMentionComponentProps<{}>
>(({ trigger, value, data, children, ...other }, ref) => {
  return (
    <span
      {...other}
      ref={ref}
      className="font-medium text-blue-700"
      title={trigger + value}
    >
      {trigger}
      {value}
    </span>
  );
});

export default CustomMentionComponent;
