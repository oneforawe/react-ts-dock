import { DateTime } from 'luxon';
import * as T from 'types';


export function getDateTimeObjLocal (
  dateTimeLocal?: string,
): T.DateTime.ValidDateTimeObj {

  if (dateTimeLocal) {
    const dateTimeObj = DateTime.fromISO(dateTimeLocal);
    if (dateTimeObj.isValid) {
      return dateTimeObj;
    }
    else {
      throw new Error(
        `The string dateTimeLocal='${dateTimeLocal}' does not generate a ` +
        'valid date-time with the luxon package function DateTime.fromISO().',
      );
    }
  }
  else {
    return DateTime.local();
  }
}


export function getDateTimeLocal (
  dateTimeObjLocal?: DateTime,
): string {

  if (dateTimeObjLocal) {
    const dateTimeLocal = dateTimeObjLocal.toISO();
    if (dateTimeLocal !== null) {
      return dateTimeLocal;
    }
    else {
      console.error('Invalid luxon DateTime object:');
      console.error('dateTimeObjLocal', dateTimeObjLocal);
      throw new Error(
        'The dateTimeObjLocal provided (see above) must not be a valid ' +
        'luxon DateTime object (DateTime<true>) because the method toISO() ' +
        'produces a null value rather than a (date-time) string.',
      );
    }
  }
  else {
    return DateTime.local().toISO();
  }
}
