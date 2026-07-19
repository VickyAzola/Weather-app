interface WeatherIcon {
  src: string;
  alt: string;
}

interface WeatherForecastParams {
  latitude: number;
  longitude: number;
  daily: string[];
  hourly: string[];
  models: string;
  current: string[];
}

interface WeatherForecastCurrent {
  time: Date;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: number;
}

interface WeatherForecastHourly {
  time: Date[];
  temperature_2m: number[];
  weather_code: number[];
  is_day: number[];
}

interface WeatherForecastDaily {
  time: Date[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

interface WeatherForecastData {
  current: WeatherForecastCurrent;
  hourly: WeatherForecastHourly;
  daily: WeatherForecastDaily;
}

interface WeatherForecastDailyViewItem {
  dayKey: string;
  dayShort: string;
  dayLong: string;
  icon: string;
  altIcon: string;
  max: string;
  min: string;
}

interface WeatherForecastHourlyViewItem {
  dayKey: string;
  hour: string;
  icon: string;
  altIcon: string;
  value: string;
}

interface WeatherForecastCurrentStatViewItem {
  label: string;
  value: string;
}

interface WeatherForecastViewModel {
  date: string;
  currentTemperature: string;
  currentIcon: string;
  currentIconAlt: string;
  currentStats: WeatherForecastCurrentStatViewItem[];
  daily: WeatherForecastDailyViewItem[];
  hourly: WeatherForecastHourlyViewItem[];
}

export type {
  WeatherIcon,
  WeatherForecastParams,
  WeatherForecastCurrent,
  WeatherForecastHourly,
  WeatherForecastDaily,
  WeatherForecastData,
  WeatherForecastDailyViewItem,
  WeatherForecastHourlyViewItem,
  WeatherForecastCurrentStatViewItem,
  WeatherForecastViewModel,
};
