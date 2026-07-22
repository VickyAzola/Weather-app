import {
  formatDate,
  formatDay,
  formatDayLong,
  formatHour,
  getDayKey,
} from "../helpers/dateTime";
import { getWeatherIcon } from "../helpers/weatherIcon";
import { getWeatherForecast } from "../services/weatherForecast";
import type {
  WeatherForecastCurrentStatViewItem,
  WeatherForecastUnits,
  WeatherForecastViewModel,
} from "../types/weatherForecast";
import { DEFAULT_WEATHER_UNITS } from "../constants/weather";

const roundValue = (value: number) => Math.round(value).toString();
const formatTemperature = (value: number) => `${Math.round(value)}°`;
const formatHumidity = (value: number) => `${roundValue(value)}%`;

const formatWindSpeed = (
  value: number,
  unit: WeatherForecastUnits["windSpeedUnit"],
) => `${roundValue(value)} ${unit === "kmh" ? "km/h" : "mph"}`;

const formatPrecipitation = (
  value: number,
  unit: WeatherForecastUnits["precipitationUnit"],
) => `${Math.round(value)} ${unit === "mm" ? "mm" : "in"}`;

const buildCurrentStats = (
  current: Awaited<ReturnType<typeof getWeatherForecast>>["current"],
  units: WeatherForecastUnits,
): WeatherForecastCurrentStatViewItem[] => [
  {
    label: "Feels Like",
    value: formatTemperature(current.apparent_temperature),
  },
  {
    label: "Humidity",
    value: formatHumidity(current.relative_humidity_2m),
  },
  {
    label: "Wind",
    value: formatWindSpeed(current.wind_speed_10m, units.windSpeedUnit),
  },
  {
    label: "Precipitation",
    value: formatPrecipitation(current.precipitation, units.precipitationUnit),
  },
];

export const transformWeatherForecast = async (
  latitude: number,
  longitude: number,
  units: WeatherForecastUnits = DEFAULT_WEATHER_UNITS,
): Promise<WeatherForecastViewModel> => {
  const weather = await getWeatherForecast(latitude, longitude, units);

  const currentIcon = getWeatherIcon(
    weather.current.weather_code,
    weather.current.is_day,
  );

  return {
    date: formatDate(weather.current.time),
    currentTemperature: formatTemperature(weather.current.temperature_2m),
    currentIcon: currentIcon.src,
    currentIconAlt: currentIcon.alt,
    currentStats: buildCurrentStats(weather.current, units),
    hourly: weather.hourly.time.map((time, index) => {
      const icon = getWeatherIcon(
        weather.hourly.weather_code[index] ?? 0,
        weather.hourly.is_day[index] ?? 1,
      );

      return {
        dayKey: getDayKey(time),
        hour: formatHour(time),
        icon: icon.src,
        altIcon: icon.alt,
        value: formatTemperature(weather.hourly.temperature_2m[index] ?? 0),
      };
    }),
    daily: weather.daily.time.map((time, index) => {
      const icon = getWeatherIcon(weather.daily.weather_code[index] ?? 0, 1);

      return {
        dayKey: getDayKey(time),
        dayShort: formatDay(time),
        dayLong: formatDayLong(time),
        icon: icon.src,
        altIcon: icon.alt,
        max: formatTemperature(weather.daily.temperature_2m_max[index] ?? 0),
        min: formatTemperature(weather.daily.temperature_2m_min[index] ?? 0),
      };
    }),
  };
};
