import { actions as dateTimeActions } from './slices/dateTime';
import { actions as weatherActions } from './slices/weather';
import { actions as counterActions } from './slices/counter';


export const actions = {
  dateTime: dateTimeActions,
  weather:  weatherActions,
  counter:  counterActions,
};
