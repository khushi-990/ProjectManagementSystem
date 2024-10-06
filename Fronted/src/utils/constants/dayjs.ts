import { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export type TDate = string | Date | dayjs.Dayjs;

export const DATE_FORMAT = 'MM/DD/YYYY';
export const WEEK_FORMAT = 'DD/MM';
export const MONTH_FORMAT = 'MM/YYYY';
export const YEAR_FORMAT = 'YYYY';
export const DATE_MONTH_FORMAT = 'Do MMM YYYY';
export const FULL_DATE_TIME = 'MMMM DD, YYYY  hh:mm a';

export const toLocal = (
  date: TDate = new Date(),
  displayFormat?: string,
  parseFormat?: string
): TDate => {
  if (displayFormat) return dayjs(date, parseFormat).local().format(displayFormat);

  return dayjs(date, parseFormat).local();
};

// custom week selection format
export const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(WEEK_FORMAT)} ~ ${dayjs(value)
    .endOf('week')
    .format(WEEK_FORMAT)}`;

export const timeAgo = (date: TDate = new Date(), ref?: TDate): string => {
  return dayjs(toLocal(date)).calendar(ref, {
    sameDay: () => `${dayjs(toLocal(date)).fromNow()}`,
    nextDay: '[Tomorrow at] hh:mm a',
    nextWeek: 'dddd [at] hh:mm a',
    lastDay: '[Yesterday at] hh:mm a',
    lastWeek: '[Last] dddd [at ] hh:mm a',
    sameElse: 'MM/DD/YYYY hh:mm a'
  });
};
