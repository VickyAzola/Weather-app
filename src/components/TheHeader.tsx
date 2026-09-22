import logo from "../assets/images/logo.svg";
import iconUnits from "../assets/images/icon-units.svg";
import UnitsDropdown from "./dropdowns/UnitsDropdown";
import type { WeatherForecastUnits } from "../types/weatherForecast";

interface TheHeaderProps {
  units: WeatherForecastUnits;
  onChangeUnits: (units: WeatherForecastUnits) => void;
}

function TheHeader({ units, onChangeUnits }: TheHeaderProps) {
  return (
    <header className="bg-NeutralBlue-900 fixed top-0 inset-x-0 z-20 flex items-center justify-between gap-4 p-4 lg:px-20 lg:pt-12">
      <img src={logo} alt="" className="w-34 lg:w-52" />

      <UnitsDropdown
        iconStart={iconUnits}
        text="Units"
        units={units}
        onChangeUnits={onChangeUnits}
      />
    </header>
  );
}

export default TheHeader;
