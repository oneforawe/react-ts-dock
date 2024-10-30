import './Counter.scss';
import { use, dispatch, actions } from 'store';
import { useState } from 'react';
import * as helper from 'helper';


export const Counter: React.FC = () => {

  const { count } = use(state => state.counter);

  // Delay of addition.
  const [isDelayed, setIsDelayed] = useState<boolean>(false);

  const toggleDelay = () => {
    setIsDelayed(state => !state);
  };

  const add = (addend: number) => () => {
    if (isDelayed) {
      dispatch(actions.counter.thunk.delayedAdd(addend));
    }
    else {
      dispatch(actions.counter.addToCount(addend));
    }
  };

  return (
    <div className="counter widget">
      <div className="title">
        Counter Component
      </div>
      <div className="body">
        <div className="data">
          <div className="label">
            Count:
          </div>
          <div className="value">
            {count}
          </div>
        </div>
        <button
          onClick={add(1)}
        >
          add 1
        </button>
        <button
          onClick={add(-1)}
        >
          add -1
        </button>
        <div
          className="checkbox"
          onClick={toggleDelay}
        >
          <input
            type="checkbox"
            id="delayed"
            name="delayed"
            checked={isDelayed}
            // onChange={toggleDelay}
            onChange={helper.utils.doNothing}
            // toggleDelay triggered by whole parent div instead of checkbox
          />
          <label
            htmlFor="delayed"
            onClick={toggleDelay}
          >
            Delay addition
          </label>
        </div>
      </div>
    </div>
  );
};
