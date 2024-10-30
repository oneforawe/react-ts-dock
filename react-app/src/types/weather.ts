import { String, Number, Record, Static } from 'runtypes';


export type RequestInput = {
  'city-name': string;
};


const ConditionType = Record({
  // Field : Data-Type, // Description.
  text: String, //       Weather condition text.
  icon: String, //       Weather icon url.
  code: Number, // (int) Weather condition unique code.
});

const CurrentType = Record({
  // Field:           Data-Type,     //           Description.
  last_updated:       String,        //           Local time when the real time data was updated.
  last_updated_epoch: Number,        // (int)     Local time when the real time data was updated in unix time.
  temp_c:             Number,        // (decimal) Temperature in celsius.
  temp_f:             Number,        // (decimal) Temperature in fahrenheit.
  feelslike_c:        Number,        // (decimal) Feels like temperature in celsius.
  feelslike_f:        Number,        // (decimal) Feels like temperature in fahrenheit.
  condition:          ConditionType, //           Weather condition.
  wind_mph:           Number,        // (decimal) Wind speed in miles per hour.
  wind_kph:           Number,        // (decimal) Wind speed in kilometer per hour.
  wind_degree:        Number,        // (int)     Wind direction in degrees.
  wind_dir:           String,        //           Wind direction as 16 point compass. e.g.: NSW.
  pressure_mb:        Number,        // (decimal) Pressure in millibars.
  pressure_in:        Number,        // (decimal) Pressure in inches.
  precip_mm:          Number,        // (decimal) Precipitation amount in millimeters.
  precip_in:          Number,        // (decimal) Precipitation amount in inches.
  humidity:           Number,        // (int)     Humidity as percentage.
  cloud:              Number,        // (int)     Cloud cover as percentage.
  is_day:             Number,        // (int)     [1 = Yes 0 = No] Whether to show day condition icon or night icon.
  uv:                 Number,        // (decimal) UV Index.
  gust_mph:           Number,        // (decimal) Wind gust in miles per hour.
  gust_kph:           Number,        // (decimal) Wind gust in kilometer per hour.
});

const LocationTimeType = Record({
  // Field:        Data-Type, //        Description.
  lat:             Number, // (decimal) Latitude in decimal degree.
  lon:             Number, // (decimal) Longitude in decimal degree.
  name:            String, //           Location name.
  region:          String, //           Region or state of the location, if availa.
  country:         String, //           Location country.
  tz_id:           String, //           Time zone name.
  localtime_epoch: Number, // (int)     Local date and time in unix time.
  localtime:       String, //           Local date and time.
});


export const ResponseDataType = Record({
  location: LocationTimeType,
  current:  CurrentType,
});

export type Report = Static<typeof ResponseDataType>;


export type Info = {
  input:  RequestInput;
  report: Report;
};


export type State = {
  loading: boolean;
  error:   string | null;
  info:    Info | null;
};
