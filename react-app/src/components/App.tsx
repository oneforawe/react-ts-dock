import './App.scss';
import { DateTime } from './dateTime';
import { Weather } from './weather';
import { Counter } from './counter';
import * as helper from 'helper';
import logo from 'assets/logo.svg';


export const App: React.FC = () => {

  // Hooks
  helper.hooks.dateTime.useDateTimeState();
  helper.hooks.weather.useWeatherState({ 'city-name': 'San Francisco' });

  return (
    <div className="app">
      <div className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          <code>React-TS-Dock</code> - A template for React projects
          written in TypeScript and contained with Docker.
        </p>
        <a
          href="https://github.com/oneforawe/react-ts-dock"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Source
        </a>
      </div>
      <div className="app-body">
        <DateTime />
        <Weather />
        <Counter />
      </div>
    </div>
  );
};
