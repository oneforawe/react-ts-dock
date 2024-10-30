import { slice, getAndSetState } from './slice';
import { getSetAndRefreshCycleState } from './cycle';


export const actions = {
  ...slice.actions,
  thunk: {
    getAndSetState,
    getSetAndRefreshCycleState,
  },
};
