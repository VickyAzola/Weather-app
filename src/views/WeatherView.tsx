import iconSearch from "../assets/images/icon-search.svg";
import iconLoading from "../assets/images/icon-loading.svg";
import iconDots from "../assets/images/icon-dots-horizontal.svg";
import RessumeCard from "../components/ResumeCard";
import DailyCard from "../components/DailyCard";
import HourlyCard from "../components/HourlyCard";
import DaysDropdown from "../components/dropdowns/DaysDropdown"
import type { ChangeEvent, SubmitEvent } from "react";
import type { GeocodingResult } from "../types/geocoding";
import type { WeatherForecastViewModel } from "../types/weatherForecast";
import { CURRENT_STAT_LABELS, DAILY_SKELETON_COUNT, HOURLY_SKELETON_COUNT } from "../constants/weather";

interface WeatherViewProps {
  hasSearched: boolean;
  loadingLocation: boolean;
  locations: GeocodingResult[];
  selectedLocation: GeocodingResult | null;
  weather: WeatherForecastViewModel | null;
  loadingWeather: boolean;
  selectedHourlyDay: string;
  onSearch: (event: SubmitEvent<HTMLFormElement>) => void;
  onCleanInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectedLocation: (location: GeocodingResult) => void;
  onSelectedHourlyDay: (dayKey: string) => void;
}

function WeatherView({
  hasSearched,
  loadingLocation,
  locations,
  selectedLocation,
  weather,
  loadingWeather,
  selectedHourlyDay,
  onSearch,
  onCleanInput,
  onSelectedLocation,
  onSelectedHourlyDay,
}: WeatherViewProps) {
  const showLocationDropdown =
    hasSearched &&
    !selectedLocation &&
    (loadingLocation || locations.length > 0);
  const showNoResults = hasSearched && !loadingLocation && !locations.length;

  const selectedHourlyDayLabel =
    weather?.daily.find((day) => day.dayKey === selectedHourlyDay)?.dayLong ??
    "";

  const hourlyToShow =
    weather?.hourly.filter((hour) => hour.dayKey === selectedHourlyDay) ?? [];

  return (
    <>
      <h1 className="text-5xl text-center text-NeutralWhite-0 font-display-BricolageGrotesque mb-12 mt-2 mx-4">
        How&apos;s the sky looking today?
      </h1>

      <form
        onSubmit={onSearch}
        className="flex flex-col lg:flex-row gap-2.5 items-center justify-center"
      >
        <div className="relative w-full lg:w-lg">
          <label htmlFor="search" className="sr-only">Search for a place</label>
          <input
            id="search"
            type="search"
            name="search"
            placeholder="Search for a place..."
            onChange={onCleanInput}
            className="bg-NeutralBlue-800 text-NeutralWhite-0 pl-14 pr-3 py-3 cursor-pointer outline-none w-full rounded-lg border border-transparent transition-all duration-200 focus-within:ring-2 focus-within:ring-NeutralWhite-0/90 focus-within:ring-offset-2 focus-within:ring-offset-NeutralBlue-900"
          />
          <img
            src={iconSearch}
            alt=""
            className="absolute bottom-4 left-5 pointer-events-none"
          />

          {showLocationDropdown && (
            <div className="absolute top-16 left-0 w-full lg:w-lg bg-NeutralBlue-800 text-NeutralWhite-0 rounded-lg p-3 border border-NeutralBlue-600">
              {loadingLocation ? (
                <div className="flex gap-3">
                  <img src={iconLoading} alt="" />
                  <p>Search in progres</p>
                </div>
              ) : (
                locations.map((location) => (
                  <button
                    type="button"
                    key={location.id}
                    onClick={() => onSelectedLocation(location)}
                    className="block p-3 hover:bg-NeutralBlue-700 hover:rounded-lg text-left cursor-pointer w-full"
                  >
                    {location.name}, {location.country}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-Blue-500 hover:bg-Blue-700 border border-NeutralBlue-900 cursor-pointer text-NeutralWhite-0 p-3 lg:px-5 rounded-lg w-full lg:w-auto transition-all duration-200 focus:bg-Blue-500 focus-within:ring-2 focus-within:ring-Blue-500 focus-within:ring-offset-2 focus-within:ring-offset-NeutralBlue-900"
        >
          Search
        </button>
      </form>

      {showNoResults ? (
        <h2 className="text-xl font-semibold text-center text-NeutralWhite-0 mt-8">
          No search result found!
        </h2>
      ) : (
        <div className="lg:flex lg:gap-8 lg:mt-4">
          <div className="lg:w-2/3">
            <section className="mt-8">
              <div
                className={`${
                  loadingWeather
                    ? "bg-NeutralBlue-800 animate-pulse"
                    : "lg:p-8 bg-[url('./assets/images/bg-today-small.svg')] lg:bg-[url('./assets/images/bg-today-large.svg')]"
                } flex flex-col lg:flex-row items-center justify-center p-4 h-72 w-full bg-cover bg-no-repeat rounded-2xl`}
              >
                {loadingWeather ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <img src={iconDots} alt="" className="w-16" />
                    <p className="text-NeutralWhite-0">Loading...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-center lg:text-left w-full">
                      <h2 className="text-NeutralWhite-0 text-3xl font-semibold">
                        {selectedLocation
                          ? `${selectedLocation.name}, ${selectedLocation.country}`
                          : "Berlin, Germany"}
                      </h2>

                      <p className="text-NeutralGray-200 pt-1">
                        {weather && weather.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-4">
                      {weather && (
                        <img
                          src={weather.currentIcon}
                          alt={weather.currentIconAlt}
                          className="max-w-32"
                        />
                      )}
                      <p className="text-7xl sm:text-8xl font-semibold italic text-NeutralWhite-0">
                        {weather && weather.currentTemperature}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-4 lg:mt-6">
                {(loadingWeather
                  ? CURRENT_STAT_LABELS.map((label) => ({ label, value: "" }))
                  : (weather?.currentStats ?? [])
                ).map((item) => (
                  <RessumeCard
                    key={item.label}
                    loading={loadingWeather}
                    title={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </section>

            <section className="mt-8">
              <h3 className="text-NeutralWhite-0 font-semibold">
                Daily forecast
              </h3>

              <div className="grid grid-cols-3 lg:grid-cols-7 gap-4 mt-4">
                {(loadingWeather
                  ? Array.from(
                      { length: DAILY_SKELETON_COUNT },
                      (_, index) => ({
                        dayShort: `day-${index}`,
                        icon: "",
                        altIcon: "",
                        max: "",
                        min: "",
                      }),
                    )
                  : (weather?.daily ?? [])
                ).map((day, index) => (
                  <DailyCard
                    key={`${day.dayShort}-${index}`}
                    loading={loadingWeather}
                    day={day.dayShort}
                    icon={day.icon}
                    altIcon={day.altIcon}
                    max={day.max}
                    min={day.min}
                  />
                ))}
              </div>
            </section>
          </div>

          <section
            className={`${
              loadingWeather && "animate-pulse"
            } mt-8 pb-4 bg-NeutralBlue-800 rounded-xl text-NeutralWhite-0 lg:w-1/3`}
          >
            <div className="p-4 flex justify-between items-center">
              <h4>Hourly forecast</h4>

              <DaysDropdown
                text={loadingWeather ? "-" : selectedHourlyDayLabel || "Tuesday"}
                selectedValue={selectedHourlyDay}
                onSelect={onSelectedHourlyDay}
                options={weather?.daily.map((day) => ({
                  label: day.dayLong,
                  value: day.dayKey,
                })) ?? []}
              />
            </div>

            <div className="flex flex-col gap-4 h-125 lg:h-145 px-4 overflow-y-scroll">
              {(loadingWeather
                ? Array.from({ length: HOURLY_SKELETON_COUNT }, (_, index) => ({
                    hour: `hour-${index}`,
                    icon: "",
                    altIcon: "",
                    value: "",
                  }))
                : hourlyToShow
              ).map((hour, index) => (
                <HourlyCard
                  key={`${hour.hour}-${index}`}
                  loading={loadingWeather}
                  hour={hour.hour}
                  value={hour.value}
                  icon={hour.icon}
                  altIcon={hour.altIcon}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default WeatherView;
