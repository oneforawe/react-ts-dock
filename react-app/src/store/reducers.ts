import { combineReducers } from 'redux';
import { slice as dateTimeSlice } from './slices/dateTime';
import { slice as weatherSlice } from './slices/weather';
import { slice as counterSlice } from './slices/counter';


const reducer = combineReducers({
  dateTime: dateTimeSlice.reducer,
  weather:  weatherSlice.reducer,
  counter:  counterSlice.reducer,
});


export default reducer;
