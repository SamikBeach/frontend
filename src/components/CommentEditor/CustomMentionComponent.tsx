import { BeautifulMentionComponentProps } from "lexical-beautiful-mentions";
import { forwardRef } from "react";

const CustomMentionComponent = forwardRef<
  HTMLDivElement,
  BeautifulMentionComponentProps<{}>
>(({ trigger, value, data: myData, children, ...other }, ref) => {
  return (
    <div {...other} ref={ref} title={trigger + value}>
      {value}
    </div>
  );
});

export default CustomMentionComponent;