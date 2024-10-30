import { DateTime } from 'luxon';
import { getDateTimeObjLocal } from './getDateTimeLocal';


export function formatDisplayDateFromObjLocal (dateTimeObjLocal: DateTime): string {
  const date = dateTimeObjLocal.toFormat('yyyy-MM-dd ccc');
  return date;
}

export function formatDisplayDateFromString (dateTimeString: string): string {
  const dateTimeObjLocal = getDateTimeObjLocal(dateTimeString);
  const date = formatDisplayDateFromObjLocal(dateTimeObjLocal);
  return date;
}
