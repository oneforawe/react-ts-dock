import { DateTime, Zone } from 'luxon';


export interface Props {
  zone?: Zone<true>;
}


export function timeStamp (props: Props): string {
  let timeStamp: string;
  if (props?.zone?.isValid) {
    const timeStampZoned = DateTime.now().setZone(props.zone).toISO();
    if (timeStampZoned) {
      timeStamp = timeStampZoned;
      return timeStamp;
    }
  }
  const timeStampUnZoned = DateTime.now().toISO();
  timeStamp = timeStampUnZoned;
  return timeStamp;
}


export function timeStampInBrackets (props: Props) {
  const timeStampInBrackets = `[${timeStamp(props)}]`;
  return timeStampInBrackets;
}
