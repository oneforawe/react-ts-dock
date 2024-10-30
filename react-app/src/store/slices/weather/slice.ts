import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as helper from 'helper';
import * as services from 'services';
import * as T from 'types';


const initialState = helper.weather.stateInit;


export const getAndSetState = createAsyncThunk(
  'weather/getAndSetState',
  async (input: T.Weather.RequestInput): Promise<T.Weather.Info> => {
    const report = await services.weather.getReport(input);
    const info = { input, report };
    return info;
  },
);


export const slice = createSlice({
  name:         'weather',
  initialState: initialState,
  reducers:     {
    setState: (_state, action: PayloadAction<T.Weather.State>) => {
      return action.payload;
    },
    resetState: () => {
      return initialState;
    },
    setErrLoad: (state, action: PayloadAction<T.ErrLoad>) => {
      state.loading = action.payload.loading;
      state.error   = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    // using thunk(s)
    builder
      .addCase(getAndSetState.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(getAndSetState.fulfilled, (state, action) => {
        state.loading = false;
        state.error   = null;
        state.info    = action.payload;
      })
      .addCase(getAndSetState.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.error.message ??
        'Fetching weather info via getAndSetState failed with no error message.';
      });
  },
});
