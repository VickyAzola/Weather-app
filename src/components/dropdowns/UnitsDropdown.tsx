import { useEffect, useRef, useState } from "react";
import iconCheckmark from "../../assets/images/icon-checkmark.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import type {
  PrecipitationUnit,
  TemperatureUnit,
  WeatherForecastUnits,
  WindSpeedUnit,
} from "../../types/weatherForecast";

interface UnitsDropdownProps {
  iconStart: string;
  text: string;
  units: WeatherForecastUnits;
  onChangeUnits: (units: WeatherForecastUnits) => void;
}

type UnitSection = {
  title: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  onSelect: (value: string) => void;
};

function UnitsDropdown({
  iconStart,
  text,
  units,
  onChangeUnits,
}: UnitsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isMetric =
    units.temperatureUnit === "celsius" &&
    units.windSpeedUnit === "kmh" &&
    units.precipitationUnit === "mm";

  const primaryActionLabel = isMetric
    ? "Switch to Imperial"
    : "Switch to Metric";

  const applyMetricUnits = () => {
    onChangeUnits({
      temperatureUnit: "celsius",
      windSpeedUnit: "kmh",
      precipitationUnit: "mm",
    });
  };

  const applyImperialUnits = () => {
    onChangeUnits({
      temperatureUnit: "fahrenheit",
      windSpeedUnit: "mph",
      precipitationUnit: "inch",
    });
  };

  const handleTogglePreset = () => {
    if (isMetric) {
      applyImperialUnits();
    } else {
      applyMetricUnits();
    }

    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const sections: UnitSection[] = [
    {
      title: "Temperature",
      options: [
        { label: "Celsius (C*)", value: "celsius" },
        { label: "Fahrenheit (F*)", value: "fahrenheit" },
      ],
      value: units.temperatureUnit,
      onSelect: (value) =>
        onChangeUnits({
          ...units,
          temperatureUnit: value as TemperatureUnit,
        }),
    },
    {
      title: "Wind Speed",
      options: [
        { label: "km/h", value: "kmh" },
        { label: "mph", value: "mph" },
      ],
      value: units.windSpeedUnit,
      onSelect: (value) =>
        onChangeUnits({
          ...units,
          windSpeedUnit: value as WindSpeedUnit,
        }),
    },
    {
      title: "Precipitation",
      options: [
        { label: "Millimeters (mm)", value: "mm" },
        { label: "Inches (in)", value: "inch" },
      ],
      value: units.precipitationUnit,
      onSelect: (value) =>
        onChangeUnits({
          ...units,
          precipitationUnit: value as PrecipitationUnit,
        }),
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="units-dropdown"
        onClick={() => setIsOpen((current) => !current)}
        className="bg-NeutralBlue-800 gap-1.5 px-2 lg:px-4 lg:py-2 lg:gap-2 py-1.5 flex items-center rounded-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-NeutralWhite-0/90 focus:ring-offset-2 focus:ring-offset-NeutralBlue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-NeutralWhite-0/90 focus-visible:ring-offset-2 focus-visible:ring-offset-NeutralBlue-900"
      >
        {iconStart && <img src={iconStart} alt="" />}
        <p className="text-NeutralWhite-0 text-sm lg:text-base">{text}</p>
        <img
          src={iconDropdown}
          alt=""
          className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>

      <div
        id="units-dropdown"
        className={`absolute right-0 z-10 mt-2 origin-top-right overflow-hidden rounded-lg border border-NeutralBlue-600 bg-NeutralBlue-800 text-NeutralWhite-0 transition-all duration-300 ease-out ${isOpen
          ? "visible max-h-150 scale-100 opacity-100"
          : "pointer-events-none invisible max-h-0 scale-95 opacity-0"
          } min-w-52 p-1`}
      >
        <button
          type="button"
          onClick={handleTogglePreset}
          className="w-full cursor-pointer rounded-lg p-2 text-left text-sm font-semibold transition-colors duration-200 hover:bg-NeutralBlue-600 focus:bg-NeutralBlue-600 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:bg-NeutralBlue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-NeutralWhite-0/80"
        >
          {primaryActionLabel}
        </button>

        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`${index < sections.length - 1 ? "border-b border-NeutralBlue-600" : ""} py-1`}
          >
            <p className="my-1 pl-2 text-sm font-light text-NeutralGray-300">
              {section.title}
            </p>

            {section.options.map((option) => {
              const isSelected = section.value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    section.onSelect(option.value);
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-left text-sm font-semibold transition-colors duration-200 hover:bg-NeutralBlue-700 focus:bg-NeutralBlue-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:bg-NeutralBlue-700 focus-visible:outline-none focus-visible:ring-1"
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <img src={iconCheckmark} alt="" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnitsDropdown;
