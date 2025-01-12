import { format, formatDistanceToNow, isAfter, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: string) => {
  const targetDate = new Date(date);
  const threeDaysAgo = subDays(new Date(), 3);

  if (isAfter(targetDate, threeDaysAgo)) {
    return formatDistanceToNow(targetDate, { addSuffix: true, locale: ko });
  }
  return format(targetDate, 'yyyy년 M월 d일');
};
