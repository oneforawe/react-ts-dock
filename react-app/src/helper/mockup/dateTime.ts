import * as T from 'types';
import { getDateTimeLocal } from '../dateTime/getDateTimeLocal';


const mockDateTimeLocal = getDateTimeLocal();


// match the mockup exactly
export const MOCKUP_dateTimeInfo: T.DateTime.Info = {
  dateTimeLocal: mockDateTimeLocal,
  dateDisplay:   '2021-12-06 Mon',
  dateDigits:    '2021-12-06',
  month:         'December',
  year:          2021,
  day:           {
    dayDigits:        6,
    dayOrdinalSuffix: 'th',
    dayOfWeek:        'Monday',
  },
  time: {
    timeDigits24Hr: '11:58',
    timeDigits12Hr: '11:58',
    amORpm:         'AM',
  },
};
