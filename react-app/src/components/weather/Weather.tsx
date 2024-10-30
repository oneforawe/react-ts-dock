import './Weather.scss';
import { use } from 'store';
import { Data } from 'components/shared';
import * as config from 'config';


export const Weather: React.FC = () => {

  // const { loading, error, info } = use(state => state.weather);
  const { info } = use(state => state.weather);

  return (
    <div className="weather widget">
      <div className="title">
        Weather Report Component
      </div>
      <div className="body">
        <Data
          label="Location:"
          value={String(info?.report.location.name)}
        />
        <Data
          label="Current&nbsp;Condition:"
          value={String(info?.report.current.condition.text)}
        />
        <Data
          label="Report&nbsp;Time:"
          value={String(info?.report.location.localtime)}
        />
        <Data
          label="Refresh&nbsp;Interval:"
          value={config.consts.weather.refresh.interval}
        />
        <div className="footer">
          Powered by <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
          >WeatherAPI.com</a>
        </div>
      </div>
    </div>
  );
};
