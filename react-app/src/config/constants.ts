import { seconds, minutes } from 'helper/utility/units';
import { type AvailableUnits } from 'helper/utility/setTimer';


const refreshPeriodInMinutes: number = (20 * minutes);
const refreshPeriodUnits: AvailableUnits = 'minutes';

const refreshInterval = `${refreshPeriodInMinutes} ${refreshPeriodUnits}`;


export const weather = {
  // refetch for failed fetches
  refetch: {
    quickEpiCycle: {
      triesMax:        3,
      periodInSeconds: (2 * seconds),
    },
    slowMajorCycle: {
      periodInSeconds: (30 * seconds),
    },
  },
  // refresh for updating weather info
  refresh: {
    updatePeriodInMinutes: refreshPeriodInMinutes,
    updatePeriodUnits:     refreshPeriodUnits,
    interval:              refreshInterval,
  },
};
