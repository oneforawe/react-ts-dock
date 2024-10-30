import { slice } from './slice';
import { createAsyncThunk, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { setTimer } from 'helper/utility';
import * as services from 'services';
import * as config from 'config';
import * as T from 'types';


async function fetchNMaxTimes (
  input: T.Weather.RequestInput,
  nMax:  number,
): Promise<T.Weather.Report | null> {

  let attempt = 1; // for quick epi-cycle fetch looping
  let report: T.Weather.Report | null = null;
  while (
    attempt <= nMax
    &&
    report === null
  ) {
    if (attempt !== 1) {
      // Delay continuing loops to reduce load on API service.
      await setTimer({
        durationMagnitude: config.consts.weather.refetch.quickEpiCycle.periodInSeconds,
        units:             'seconds',
      });
    }
    // Start/Continue epi-cycle fetch attempts.
    try {
      report = await services.weather.getReport(input);
    }
    catch (err) {
      console.error(`Error: ${err}`);
    }
    attempt++;
  }
  return report;
}


const getAndSetContentfulState = createAsyncThunk(
  'dailyXp/getAndSetContentfulState',
  async (input: T.Weather.RequestInput, thunkAPI): Promise<T.Weather.Report> => {

    const dispatch = thunkAPI.dispatch;

    // For the major (refetch) loops (repeating epi-cycle bunches), do not limit
    // number of attempts but keep fetching to get a contentful state.
    // For the quick epi-cycle fetch-looping, limit number of fetches at nMax.
    const nMax = config.consts.weather.refetch.quickEpiCycle.triesMax;

    let report: T.Weather.Report | null = null;
    do {
      // Start/Continue an epi-cycle fetch-bunch to attempt to get contentful state.
      report = await fetchNMaxTimes(input, nMax);

      if (report === null) {
        // Delay continuing epi-cycle loops to reduce load on server.
        await setTimer({
          durationMagnitude: config.consts.weather.refetch.slowMajorCycle.periodInSeconds,
          units:             'seconds',
        });
      }
      else {
        const info = { input, report };
        dispatch(slice.actions.setState({
          error:   null,
          loading: false,
          info,
        }));
      }
    }
    while (
      report === null
    );

    return report;
  },
);


async function cycleRecursiveStep (
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  input:    T.Weather.RequestInput,
) {

  dispatch(slice.actions.setErrLoad({ error: null, loading: true }));

  // Resolution of promise can take any length of time, so major (refresh)
  // cycles may not be regular.
  await Promise.all([dispatch(getAndSetContentfulState(input))]);

  // Delay loops by major refresh-cycle period to reduce load on server.
  await setTimer({
    durationMagnitude: config.consts.weather.refresh.updatePeriodInMinutes,
    units:             config.consts.weather.refresh.updatePeriodUnits,
  });

  cycleRecursiveStep(dispatch, input);
}


export const getSetAndRefreshCycleState = createAsyncThunk(
  'dailyXp/getSetAndRefreshCycleState',
  async (input: T.Weather.RequestInput, thunkAPI) => {

    const dispatch = thunkAPI.dispatch;

    // Start major (refresh) cycle for get-and-set and refreshing weather info.
    cycleRecursiveStep(dispatch, input);

  },
);
