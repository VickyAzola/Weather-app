import iconSunny from "../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconFog from "../assets/images/icon-fog.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import type { WeatherIcon } from "../types/weatherForecast";


export const getWeatherIcon = (
  weatherCode: number,
  isDay: number = 1,
): WeatherIcon => {
  const daytimeSuffix = isDay === 1 ? "day" : "night";

  switch (true) {
    case weatherCode === 0:
      return {
        src: iconSunny,
        alt: `Clear sky icon for ${daytimeSuffix}`,
      };

    case weatherCode === 1 || weatherCode === 2:
      return {
        src: iconPartlyCloudy,
        alt: `Partly cloudy icon for ${daytimeSuffix}`,
      };

    case weatherCode === 3:
      return {
        src: iconOvercast,
        alt: "Overcast icon",
      };

    case weatherCode === 45 || weatherCode === 48:
      return {
        src: iconFog,
        alt: "Fog icon",
      };

    case [51, 53, 55, 56, 57].includes(weatherCode):
      return {
        src: iconDrizzle,
        alt: "Drizzle icon",
      };

    case [61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode):
      return {
        src: iconRain,
        alt: "Rain icon",
      };

    case [71, 73, 75, 77, 85, 86].includes(weatherCode):
      return {
        src: iconSnow,
        alt: "Snow icon",
      };

    case [95, 96, 99].includes(weatherCode):
      return {
        src: iconStorm,
        alt: "Thunderstorm icon",
      };

    default:
      return {
        src: isDay === 1 ? iconSunny : iconOvercast,
        alt: "Weather icon",
      };
  }
};
