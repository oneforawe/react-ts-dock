import { DateTime } from 'luxon';


export type ValidDateTimeObj = DateTime<true>;


export interface Info {
  dateTimeLocal: string; // local timestamp, full date-time
  dateDisplay:   string; // intended to be default display date format
  dateDigits:    string; // 'YYYY-MM-DD'
  year:          number; // YYYY
  month:         string; // full month name
  day: {
    dayDigits:        number; // eg, 1
    dayOrdinalSuffix: string; // eg, 'st'
    dayOfWeek:        string; // eg, 'Monday'
  };
  time: {
    timeDigits24Hr: string; // eg, '23:59'
    timeDigits12Hr: string; // eg, '11:59'
    amORpm:         string; // eg, 'PM'
  };
}


export interface State {
  loading: boolean; // intended only for initial loading or loading with error
  error:   string | null;
  info:    Info | null;
}


// EXAMPLE:
// const dateTimeInfo = {
//   dateTimeLocal: '2023-03-09T13:22:00.333-08:00',
//   date:          '2023-03-09 Thu',
//   dateDigits:    '2023-03-09',
//   year:          2023,
//   month:         'March',
//   day:           {
//     dayDigits:        9,
//     dayOrdinalSuffix: 'th',
//     dayOfWeek:        'Thursday',
//   },
//   time: {
//     timeDigits24: '13:22',
//     timeDigits:   '1:22',
//     amORpm:       'PM',
//   },
// };
