import TheHeader from "./components/TheHeader";
import searchLocation from "./services/geocoding";
import {
  useState,
  useEffect,
  useRef,
  type SubmitEvent,
  type ChangeEvent,
} from "react";
import type { GeocodingResult } from "./types/geocoding";
import { transformWeatherForecast } from "./composables/weatherForecast";
import type {
  WeatherForecastUnits,
  WeatherForecastViewModel,
} from "./types/weatherForecast";
import WeatherView from "./views/WeatherView";
import ErrorView from "./views/ErrorView";
import { DEFAULT_LOCATION, DEFAULT_WEATHER_UNITS } from "./constants/weather";
import TheFooter from "./components/TheFooter";

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
  const [locationSearchError, setLocationSearchError] = useState<string | null>(
    null,
  );
  const [selectedHourlyDay, setSelectedHourlyDay] = useState<string>("");
  const locationRequestId = useRef(0);
  const weatherRequestId = useRef(0);

  const handleSearchLocations = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = String(
      new FormData(e.currentTarget).get("search") ?? "",
    ).trim();
    if (!query) return;

    const requestId = ++locationRequestId.current;

    setSelectedLocation(null);
    setLoadingLocation(true);
    setLocations([]);
    setHasSearched(true);
    setLocationSearchError(null);

    try {
      const location = await searchLocation(query);

      if (requestId !== locationRequestId.current) return;

      if ("error" in location) {
        console.error(location.reason);
        setLocationSearchError(
          location.reason || "We couldn't search for locations. Please try again.",
        );
        return;
      }

      setLocations(location.results ?? []);
    } catch (error) {
      if (requestId === locationRequestId.current) {
        console.error("Error searching location:", error);
        setLocationSearchError(
          "We couldn't search for locations. Please check your connection and try again.",
        );
      }
    } finally {
      if (requestId === locationRequestId.current) {
        setLoadingLocation(false);
      }
    }
  };

  const handleCleanInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.trim()) {
      locationRequestId.current += 1;
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
    const requestId = ++weatherRequestId.current;
    setLoadingWeather(true);
    setWeatherError(false);

    try {
      const weatherData = await transformWeatherForecast(
        latitude,
        longitude,
        units,
      );

      if (requestId !== weatherRequestId.current) return;

      setWeather(weatherData);
      setSelectedHourlyDay(weatherData.daily[0]?.dayKey ?? "");
    } catch (error) {
      if (requestId === weatherRequestId.current) {
        console.error("Error loading weather:", error);
        setWeatherError(true);
      }
    } finally {
      if (requestId === weatherRequestId.current) {
        setLoadingWeather(false);
      }
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
        className={`${weatherError ? "items-center justify-center py-10" : "pt-28 pb-16"} min-h-screen px-4 flex flex-col lg:px-20`}
      >
        {weatherError ? (
          <ErrorView onClickRetry={handleRetry} />
        ) : (
          <WeatherView
            hasSearched={hasSearched}
            loadingLocation={loadingLocation}
            locations={locations}
            selectedLocation={selectedLocation}
            locationSearchError={locationSearchError}
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

      <TheFooter />
    </>
  );
}

export default App;
