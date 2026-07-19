import iconCheckmark from "../../assets/images/icon-checkmark.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";
import { useState } from "react";

interface DropdownButtonProps {
  type?: "primary" | "secondary";
  iconStart?: string;
  altIconStart?: string;
  text: string;
  options?: Array<{ label: string; value: string }>;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

function DropdownButton({
  type = "primary",
  iconStart,
  altIconStart,
  text,
  options,
  onSelect,
}: DropdownButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const variantStyle =
    type === "primary"
      ? "bg-NeutralBlue-800 gap-1.5 px-2 lg:px-4 lg:py-2 lg:gap-2"
      : "bg-NeutralBlue-600 gap-2 px-3";

  const primaryContent = [
    {
      title: "Temperature",
      values: ["Celsius (°C)", "Fahrenheit (°F)"],
    },
    {
      title: "Wind Speed",
      values: ["km/h", "mph"],
    },
    {
      title: "Precipitation",
      values: ["Millimeters (mm)", "Inches (in)"],
    },
  ];

  const handleDropdowClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handleDropdowClick}
          className={`${variantStyle} py-1.5 flex items-center rounded-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-NeutralWhite-0/90 focus:ring-offset-2 focus:ring-offset-NeutralBlue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-NeutralWhite-0/90 focus-visible:ring-offset-2 focus-visible:ring-offset-NeutralBlue-900`}
        >
          {iconStart && <img src={iconStart} alt={altIconStart} />}
          <p className="text-NeutralWhite-0 text-sm lg:text-base">
            {text}
          </p>
          <img
            src={iconDropdown}
            alt="Dropdown Icon"
            className={`transition-transform duration-300 ease-out ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`absolute right-0 z-10 mt-2 origin-top-right overflow-hidden rounded-lg border border-NeutralBlue-600 bg-NeutralBlue-800 text-NeutralWhite-0 transition-all duration-300 ease-out ${
            isDropdownOpen
              ? "visible max-h-150 scale-100 opacity-100"
              : "pointer-events-none invisible max-h-0 scale-95 opacity-0"
          } ${type === "primary" ? "min-w-52 p-1" : "min-w-44 p-1"}`}
        >
          {type === "primary" ? (
            <>
              <button className="w-full cursor-pointer rounded-lg p-2 text-left text-sm font-semibold hover:bg-NeutralBlue-600 transition-colors duration-200 focus:outline-none focus:bg-NeutralBlue-600 focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:outline-none focus-visible:bg-NeutralBlue-600 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-NeutralWhite-0/80">
                Switch to Imperial
              </button>

              {primaryContent.map((item, index) => (
                <div
                  key={item.title}
                  className={`py-1 ${
                    index !== primaryContent.length - 1
                      ? "border-b border-NeutralBlue-600"
                      : ""
                  }`}
                >
                  <p className="my-1 pl-2 text-sm font-light text-NeutralGray-300">
                    {item.title}
                  </p>

                  {item.values.map((value) => (
                    <button
                      key={value}
                      className="flex w-full cursor-pointer justify-between rounded-md px-2 py-2 text-left text-sm font-semibold hover:bg-NeutralBlue-700 transition-colors duration-200 focus:outline-none focus:bg-NeutralBlue-700 focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:outline-none focus-visible:bg-NeutralBlue-700 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-NeutralWhite-0/80"
                    >
                      {value}

                      <img src={iconCheckmark} alt="Check Icon" />
                    </button>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <>
              {(options ?? []).map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    onSelect?.(item.value);
                    setIsDropdownOpen(false);
                  }}
                  className="block w-full cursor-pointer rounded-md px-2 py-2 text-left text-sm font-semibold hover:bg-NeutralBlue-700 transition-colors duration-200 focus:outline-none focus:bg-NeutralBlue-700 focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:outline-none focus-visible:bg-NeutralBlue-700 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-NeutralWhite-0/80"
                >
                  {item.label}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DropdownButton;
