import { useEffect } from 'react';
import { dispatch, actions } from 'store';
import * as T from 'types';


/**
 * Handles the redux-managed Weather state/info, get/setting it at initial
 * render and on a cycle.
 */
export const useWeatherStateComplex = (input: T.Weather.RequestInput) => {

  useEffect(() => {
    /* Start refresh (and refetch) cycles at initial rendering. */
    dispatch(actions.weather.thunk.getSetAndRefreshCycleState(input));
  }, [input]);

};
