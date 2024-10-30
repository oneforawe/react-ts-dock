import axios from 'axios';
import * as config from 'config';
import * as T from 'types';


export async function getReport (
  input: T.Weather.RequestInput,
): Promise<T.Weather.Report> {

  const query =
    `key=${config.secrets.API_KEY_WEATHER}` +
    '&' +
    `q=${input['city-name']}`;

  const url = config.urls.weather.report.current.base + '?' + query;

  const response = await axios({
    url,
    method: 'GET',
  });

  const report = T.Weather.ResponseDataType.check(response.data);

  return report;
}
