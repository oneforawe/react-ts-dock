import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as helper from 'helper';
import * as T from 'types';


const initialState = helper.counter.stateInit;


export const delayedAdd = createAsyncThunk(
  'counter/delayedAdd',
  async (addend: number, thunkAPI) => {
    await helper.utils.setTimer({ durationMagnitude: 1, units: 'seconds' });
    const dispatch = thunkAPI.dispatch;
    dispatch(actions.addToCount(addend));
  },
);


export const slice = createSlice({
  name:         'counter',
  initialState: initialState,
  reducers:     {
    setState: (_state, action: PayloadAction<T.Counter.State>) => {
      return action.payload;
    },
    resetState: () => {
      return initialState;
    },
    addToCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});


export const actions = {
  ...slice.actions,
  thunk: {
    delayedAdd,
  },
};
