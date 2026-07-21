import { formatDate, formatDay, formatDayLong, formatHour, getDayKey } from "../helpers/dateTime";
import { getWeatherIcon } from "../helpers/weatherIcon";
import { getWeatherForecast } from "../services/weatherForecast";
import type {
  WeatherForecastViewModel,
  WeatherForecastCurrentStatViewItem,
} from "../types/weatherForecast";

const roundValue = (value: number) => Math.round(value).toString();
const formatHumidity = (value: number) => `${roundValue(value)}%`;
const formatWindSpeed = (value: number) => `${roundValue(value)} km/h`;
const formatPrecipitation = (value: number) => `${Number(value.toFixed(1))} mm`;
const roundTemperature = (value: number) => `${Math.round(value)}°`;


const buildCurrentStats = (
  current: Awaited<ReturnType<typeof getWeatherForecast>>["current"],
): WeatherForecastCurrentStatViewItem[] => [
  {
    label: "Feels Like",
    value: roundTemperature(current.apparent_temperature),
  },
  {
    label: "Humidity",
    value: formatHumidity(current.relative_humidity_2m),
  },
  {
    label: "Wind",
    value: formatWindSpeed(current.wind_speed_10m),
  },
  {
    label: "Precipitation",
    value: formatPrecipitation(current.precipitation),
  },
];

export const transformWeatherForecast = async (
  latitude: number,
  longitude: number
): Promise<WeatherForecastViewModel> => {

  const weather = await getWeatherForecast(
    latitude,
    longitude,
  );
  
  const currentIcon = getWeatherIcon(
    weather.current.weather_code,
    weather.current.is_day,
  );

  return {
    date: formatDate(weather.current.time),
    currentTemperature: roundTemperature(weather.current.temperature_2m),
    currentIcon: currentIcon.src,
    currentIconAlt: currentIcon.alt,
    currentStats: buildCurrentStats(weather.current),
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
        value: roundTemperature(weather.hourly.temperature_2m[index] ?? 0),
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
        max: roundTemperature(weather.daily.temperature_2m_max[index] ?? 0),
        min: roundTemperature(weather.daily.temperature_2m_min[index] ?? 0),
      };
    }),
  };
};
