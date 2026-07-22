import type { WeatherForecastUnits } from "../types/weatherForecast";

const DEFAULT_LOCATION = {
  latitude: 52.52437,
  longitude: 13.41053,
};

const DEFAULT_WEATHER_UNITS: WeatherForecastUnits = {
  temperatureUnit: "celsius",
  windSpeedUnit: "kmh",
  precipitationUnit: "mm",
};

const CURRENT_STAT_LABELS = ["Feels Like", "Humidity", "Wind", "Precipitation"];

const DAILY_SKELETON_COUNT = 7;
const HOURLY_SKELETON_COUNT = 7;

export {
  DEFAULT_LOCATION,
  DEFAULT_WEATHER_UNITS,
  CURRENT_STAT_LABELS,
  DAILY_SKELETON_COUNT,
  HOURLY_SKELETON_COUNT,
};
