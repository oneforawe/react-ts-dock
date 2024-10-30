import './DateTime.scss';
import { use } from 'store';
import { Data } from 'components/shared';


export const DateTime: React.FC = () => {

  // const { loading, error, info } = use(state => state.dateTime);
  const { info } = use(state => state.dateTime);
  const dateDisplay = info?.dateDisplay;
  const timeDisplay = `${info?.time.timeDigits12Hr} ${info?.time.amORpm}`;

  return (
    <div className="date-time widget">
      <div className="title">
        DateTime Component
      </div>
      <div className="body">
        <Data
          label="Date:"
          value={String(dateDisplay)}
        />
        <Data
          label="Time:"
          value={timeDisplay}
        />
      </div>
    </div>
  );
};
