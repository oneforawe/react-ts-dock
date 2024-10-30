import axios from 'axios';
import { getPossibleSubMessageString } from './getSubMessage';


export function getErrMessage (err: unknown): string {
  let errMessage1 = '';
  let errMessage2 = '';
  let conjunction = '';
  if (err instanceof Error) {
    errMessage1 = err.message;
  }
  else if (axios.isAxiosError(err)) {
    errMessage1 = err.message;
    // err.response.data.message might exist
    const possibleData = (err.response && err.response.data);
    errMessage2 = getPossibleSubMessageString(possibleData);
  }
  else if (err === '') {
    return 'Error is an empty string.';
  }
  else if (typeof err === 'string') {
    errMessage1 = err;
  }
  else if (err === undefined) {
    return 'Error is undefined.';
  }
  if (err === null) {
    return 'Error is a null object.';
  }
  else if (
    typeof err === 'boolean'  ||
    typeof err === 'bigint'   ||
    typeof err === 'number'   ||
    typeof err === 'function' ||
    typeof err === 'symbol'
  ) {
    return 'Error is of an unexpected type.';
  }
  else {
    // err.message might exist
    errMessage1 = getPossibleSubMessageString(err);
  }

  if (errMessage1 && errMessage2) {
    conjunction = ' +=+=+=+ ';
  }

  return errMessage1 + conjunction + errMessage2;
}
