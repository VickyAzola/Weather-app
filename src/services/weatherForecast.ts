import { fetchWeatherApi } from "openmeteo";
import type { WeatherForecastData } from "../types/weatherForecast";

const URL = "https://api.open-meteo.com/v1/forecast";

const toNumberArray = (
  values: ArrayLike<number> | Iterable<number> | null | undefined,
) => Array.from(values ?? []);

const buildParams = (latitude: number, longitude: number) => ({
  latitude,
  longitude,
  daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
  hourly: ["temperature_2m", "weather_code", "is_day"],
  models: "ncep_gfs_seamless",
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation",
    "weather_code",
    "wind_speed_10m",
    "is_day",
  ],
});

export const getWeatherForecast = async (
  latitude: number,
  longitude: number,
): Promise<WeatherForecastData> => {
  const responses = await fetchWeatherApi(URL, buildParams(latitude, longitude));
  const response = responses[0];

  if (!response) {
    throw new Error("No weather forecast data was returned");
  }

  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;
  const hourly = response.hourly()!;
  const daily = response.daily()!;

  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      weather_code: current.variables(4)!.value(),
      wind_speed_10m: current.variables(5)!.value(),
      is_day: current.variables(6)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) +
              i * hourly.interval() +
              utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: toNumberArray(hourly.variables(0)!.valuesArray()),
      weather_code: toNumberArray(hourly.variables(1)!.valuesArray()),
      is_day: toNumberArray(hourly.variables(2)!.valuesArray()),
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      weather_code: toNumberArray(daily.variables(0)!.valuesArray()),
      temperature_2m_max: toNumberArray(daily.variables(1)!.valuesArray()),
      temperature_2m_min: toNumberArray(daily.variables(2)!.valuesArray()),
    },
  };
};
