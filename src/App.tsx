import TheHeader from "./components/TheHeader";
import searchLocation from "./services/geocoding";
import { useState, useEffect, type SubmitEvent, type ChangeEvent } from "react";
import type { GeocodingResult } from "./types/geocoding";
import { transformWeatherForecast } from "./composables/weatherForecast";
import type {
  WeatherForecastUnits,
  WeatherForecastViewModel,
} from "./types/weatherForecast";
import WeatherView from "./views/WeatherView";
import ErrorView from "./views/ErrorView";
import { DEFAULT_LOCATION, DEFAULT_WEATHER_UNITS } from "./constants/weather";

function App() {
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<GeocodingResult[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<GeocodingResult | null>(null);
  const [weather, setWeather] = useState<WeatherForecastViewModel | null>(null);
  const [weatherUnits, setWeatherUnits] = useState<WeatherForecastUnits>(
    DEFAULT_WEATHER_UNITS,
  );
  const [loadingWeather, setLoadingWeather] = useState<boolean>(true);
  const [weatherError, setWeatherError] = useState<boolean>(false);
  const [selectedHourlyDay, setSelectedHourlyDay] = useState<string>("");

  const handleSearchLocations = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = String(
      new FormData(e.currentTarget).get("search") ?? "",
    ).trim();
    if (!query) return;

    setSelectedLocation(null);
    setLoadingLocation(true);
    setLocations([]);
    setHasSearched(true);

    try {
      const location = await searchLocation(query);

      if ("error" in location) {
        console.error(location.reason);
        setLoadingLocation(false);
        return;
      }

      setLocations(location.results ?? []);
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleCleanInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.trim()) {
      setHasSearched(false);
      setLocations([]);
      setLoadingLocation(false);
    }
  };

  const loadWeatherData = async (
    latitude: number,
    longitude: number,
    units: WeatherForecastUnits,
  ) => {
    setLoadingWeather(true);
    setWeatherError(false);

    try {
      const weatherData = await transformWeatherForecast(
        latitude,
        longitude,
        units,
      );

      setWeather(weatherData);
      setSelectedHourlyDay(weatherData.daily[0]?.dayKey ?? "");
    } catch (error) {
      console.error("Error loading weather:", error);
      setWeatherError(true);
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleLoadLocationWeather = async (
    location: GeocodingResult
  ) => {
    setSelectedLocation(location);

    loadWeatherData(
      location.latitude,
      location.longitude,
      weatherUnits,
    );
  };

  const handleChangeUnits = (units: WeatherForecastUnits) => {
    setWeatherUnits(units);
    
    const latitude = selectedLocation
      ? selectedLocation.latitude
      : DEFAULT_LOCATION.latitude;
    const longitude = selectedLocation
      ? selectedLocation.longitude
      : DEFAULT_LOCATION.longitude;

    loadWeatherData(latitude, longitude, units);
  };

  const handleRetry = () => {
    if (selectedLocation) {
      handleLoadLocationWeather(selectedLocation);
    } else {
      window.location.reload();
    }
  };

  useEffect(() => {
    const loadWeather = async () => {
      loadWeatherData(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_WEATHER_UNITS,
      );
    };

    void loadWeather();
  }, []);

  return (
    <>
      <TheHeader units={weatherUnits} onChangeUnits={handleChangeUnits} />

      <main
        className={`${weatherError ? "items-center justify-center py-10" : "py-28"} min-h-screen px-4 flex flex-col lg:px-20`}
      >
        {weatherError ? (
          <ErrorView onClickRetry={handleRetry} />
        ) : (
          <WeatherView
            hasSearched={hasSearched}
            loadingLocation={loadingLocation}
            locations={locations}
            selectedLocation={selectedLocation}
            weather={weather}
            loadingWeather={loadingWeather}
            selectedHourlyDay={selectedHourlyDay}
            onSearch={handleSearchLocations}
            onCleanInput={handleCleanInput}
            onSelectedLocation={handleLoadLocationWeather}
            onSelectedHourlyDay={setSelectedHourlyDay}
          />
        )}
      </main>
    </>
  );
}

export default App;
