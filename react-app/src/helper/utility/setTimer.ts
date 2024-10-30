type Resolve = (value: void) => void;

export type AvailableUnits =
  'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

interface Props {
  units:             AvailableUnits;
  durationMagnitude: number;
}


export function setTimer ({ durationMagnitude, units }: Props) {

  // If precision in ending-time of timer is required, this is not a sufficient
  // solution, due to variations in day-durations (for time-changes) and perhaps
  // imprecision in the net-resultant-time-passed with a setTimeout.
  let durationInMilliseconds: number;
  switch (units) {
    case 'milliseconds':
      durationInMilliseconds = durationMagnitude;
      break;
    case 'seconds':
      durationInMilliseconds = durationMagnitude * 1000;
      break;
    case 'minutes':
      durationInMilliseconds = durationMagnitude * 60 * 1000;
      break;
    case 'hours':
      durationInMilliseconds = durationMagnitude * 60 * 60 * 1000;
      break;
    case 'days':
      durationInMilliseconds = durationMagnitude * 24 * 60 * 60 * 1000;
      break;
    case 'weeks':
      durationInMilliseconds = durationMagnitude * 7 * 24 * 60 * 60 * 1000;
  }
  return new Promise((resolve: Resolve) => {
    setTimeout(resolve, durationInMilliseconds);
  });
}
