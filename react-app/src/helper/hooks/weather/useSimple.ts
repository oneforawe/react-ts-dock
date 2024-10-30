import { useEffect } from 'react';
import { dispatch, actions } from 'store';
import * as T from 'types';


/**
 * Handles the redux-managed Weather state/info, get/setting it at initial
 * render.
 */
export const useWeatherStateSimple = (input: T.Weather.RequestInput) => {

  useEffect(() => {
    /* Get and set state at initial rendering. */
    dispatch(actions.weather.thunk.getAndSetState(input));
  }, [input]);

};
