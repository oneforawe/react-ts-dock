import { store } from './store';

export { store };

export { useTypedSelector as use } from './hooks';
export const dispatch = store.dispatch;
export { actions } from './actions';

// Usually, one will only want to import to components from these three:
// import { use, dispatch, actions } from 'store';
