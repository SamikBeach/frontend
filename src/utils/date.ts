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

export const formatAuthorDate = (date: string | null, isBc: boolean | null) => {
  if (!date) return '';
  const year = date.split('-')[0];
  return isBc ? `BC ${year}` : year;
};

export const formatAuthorLifespan = (
  bornDate: string | null,
  bornDateIsBc: boolean | null,
  diedDate: string | null,
  diedDateIsBc: boolean | null
) => {
  const birth = formatAuthorDate(bornDate, bornDateIsBc);
  const death = formatAuthorDate(diedDate, diedDateIsBc);

  if (!birth && !death) return '';
  if (!death) return `${birth}년 ~`;
  return `${birth}년 - ${death}년`;
};
