import { useEffect } from 'react';
import { use, dispatch, actions } from 'store';
import { stateInit as dateTimeInit } from 'helper/dateTime/stateInit';
import { getDateTimeInfo, getTimeDigits12Hr } from 'helper/dateTime/getDateTimeInfo';
import { getDateTimeObjLocal } from 'helper/dateTime/getDateTimeLocal';
import { getErrMessage } from 'helper/utility';
import _ from 'lodash';


/**
 * Handles the redux-managed DateTime state/info, get/setting it at mounting and
 * every minute, checking for time change every `checkPeriod` milliseconds
 * (default: 500ms), precise to an error equivalent to the checkPeriod.
 */
export const useDateTimeStateComplex = (checkPeriodInMs = 500) => {

  const dateTime = use(state => state.dateTime);

  useEffect(() => {
    /* Set dateTime state every minute as the minute value advances, triggering
    ** a rerender and cleanup of the interval used. */

    const intervalId = setInterval(() => {
      // For every `checkPeriod`, check for a need to update the dateTime info.
      if (_.isEqual(dateTime, dateTimeInit)) {
        // At initialization, just set the state to loading, for fun.
        dispatch(actions.dateTime.setState(
          { loading: true, error: null, info: null },
        ));
      }
      else if (dateTime.info === null) {
        // Time information is missing; get info as soon as possible.
        try {
          const newDateTimeObjLocal = getDateTimeObjLocal();
          const newDateTimeInfo = getDateTimeInfo(newDateTimeObjLocal);
          dispatch(actions.dateTime.setState(
            { loading: false, error: null, info: newDateTimeInfo },
          ));
        }
        catch (err) {
          console.error(`Error in useDateTimeState: ${err}`);
          const errMessage = getErrMessage(err);
          dispatch(actions.dateTime.setState(
            { loading: true, error: errMessage, info: null },
          ));
        }
      }
      else {
        // Time information is present; check for an update to the minute value.
        try {
          const newDateTimeObjLocal = getDateTimeObjLocal();
          const newTimeDigits12Hr = getTimeDigits12Hr(newDateTimeObjLocal);
          if (newTimeDigits12Hr !== dateTime.info.time.timeDigits12Hr) {
            // If minute value changes, set new dateTime info (& trigger render).
            const newDateTimeInfo = getDateTimeInfo(newDateTimeObjLocal);
            dispatch(actions.dateTime.setState(
              { loading: false, error: null, info: newDateTimeInfo },
            ));
          }
          // Otherwise wait another period and check again.
        }
        catch (err) {
          console.error(`Error in useDateTimeState: ${err}`);
          const errMessage = getErrMessage(err);
          dispatch(actions.dateTime.setState(
            { loading: true, error: errMessage, info: null },
          ));
        }
      }
    }, checkPeriodInMs);

    // Return a cleanup function to clear the interval on every re-render.
    return () => {
      clearInterval(intervalId);
    };

  }, [checkPeriodInMs, dateTime]);

};
