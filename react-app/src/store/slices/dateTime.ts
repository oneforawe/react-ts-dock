import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as T from 'types';
import * as helper from 'helper';


const initialState = helper.dateTime.stateInit;


export const slice = createSlice({
  name:         'dateTime',
  initialState: initialState,
  reducers:     {
    setState: (_state, action: PayloadAction<T.DateTime.State>) => {
      return action.payload;
    },
    resetState: () => {
      return initialState;
    },
    getAndSetState: () => {
      try {
        const newDateTimeObjLocal = helper.dateTime.getDateTimeObjLocal();
        const newDateTimeInfo = helper.dateTime.getDateTimeInfo(newDateTimeObjLocal);
        return { loading: false, error: null, info: newDateTimeInfo };
      }
      catch (err) {
        console.error(`Error in dateTime.getAndSetState: ${err}`);
        const errMessage = helper.utils.getErrMessage(err);
        return { loading: false, error: errMessage, info: null };
      }
    },
  },
});


export const actions = {
  ...slice.actions,
};
