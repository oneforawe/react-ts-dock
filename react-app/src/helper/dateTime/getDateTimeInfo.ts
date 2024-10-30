import * as T from 'types';
import { getDateTimeLocal } from './getDateTimeLocal';
import { formatDisplayDateFromObjLocal } from './formatDisplayDate';


// CHOOSE DEMO OPTION (to show current date/time or match the mockup, etc):
import { MOCKUP_dateTimeInfo } from '../mockup/dateTime';
const demoOptions = ['current date/time', 'mockup'];
const demoSelection = demoOptions[0];  // choose here


function getOrdinalSuffix (dayDigits: number) {
  switch (dayDigits) {
    case 1:
    case 21:
    case 31:
      return 'st';
    case 2:
    case 22:
      return 'nd';
    case 3:
    case 23:
      return 'rd';
    default:
      return 'th';
  }
}

function getTimeDigits24Hr (
  dateTimeObjLocal: T.DateTime.ValidDateTimeObj,
) {
  const timeDigits24Hr = dateTimeObjLocal.toFormat('HH:mm');
  return timeDigits24Hr;
}

export function getTimeDigits12Hr (
  dateTimeObjLocal: T.DateTime.ValidDateTimeObj,
) {
  const timeDigits12Hr = dateTimeObjLocal.toFormat('h:mm');
  return timeDigits12Hr;
}


/**
 * Transforms a luxon local DateTime object into a DateTimeInfo object with
 * relevant date and time info for this app.
 */
export function getDateTimeInfo (
  dateTimeObjLocal: T.DateTime.ValidDateTimeObj,
): T.DateTime.Info {

  const dateTimeLocal = getDateTimeLocal(dateTimeObjLocal);
  const dateDisplay = formatDisplayDateFromObjLocal(dateTimeObjLocal);
  const dateDigits = dateTimeObjLocal.toFormat('y-MM-dd');
  const year = dateTimeObjLocal.year;
  const month = dateTimeObjLocal.monthLong;
  const dayDigits = dateTimeObjLocal.day;
  const dayOfWeek = dateTimeObjLocal.weekdayLong;
  const dayOrdinalSuffix = getOrdinalSuffix(dayDigits);
  const timeDigits24Hr = getTimeDigits24Hr(dateTimeObjLocal);
  const timeDigits12Hr = getTimeDigits12Hr(dateTimeObjLocal);
  const amORpm = dateTimeObjLocal.toFormat('a');

  const dateTimeInfo: T.DateTime.Info = {
    dateTimeLocal,
    dateDisplay,
    dateDigits,
    year,
    month,
    day:  { dayDigits, dayOrdinalSuffix, dayOfWeek },
    time: { timeDigits24Hr, timeDigits12Hr, amORpm },
  };
  // return dateTimeInfo;
  switch (demoSelection) {
    case 'current date/time':
      return dateTimeInfo;
    case 'mockup':
      return MOCKUP_dateTimeInfo;
    default:
      throw new Error('Something went wrong with demo option selection.');
  }
}
