import { useState } from "react";
import iconCheckmark from "../../assets/images/icon-checkmark.svg";
import iconDropdown from "../../assets/images/icon-dropdown.svg";

interface DaysDropdownProps {
  text: string;
  options: Array<{ label: string; value: string }>;
  selectedValue: string;
  onSelect: (value: string) => void;
}

function DaysDropdown({ text, options, selectedValue, onSelect }: DaysDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="bg-NeutralBlue-600 gap-2 px-3 py-1.5 flex items-center rounded-md cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-NeutralWhite-0/90 focus:ring-offset-2 focus:ring-offset-NeutralBlue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-NeutralWhite-0/90 focus-visible:ring-offset-2 focus-visible:ring-offset-NeutralBlue-900"
      >
        <p className="text-NeutralWhite-0 text-sm lg:text-base">{text}</p>
        <img
          src={iconDropdown}
          alt="Dropdown Icon"
          className={`transition-transform duration-300 ease-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={`absolute right-0 z-10 mt-2 origin-top-right overflow-hidden rounded-lg border border-NeutralBlue-600 bg-NeutralBlue-800 text-NeutralWhite-0 transition-all duration-300 ease-out ${
          isOpen
            ? "visible max-h-150 scale-100 opacity-100"
            : "pointer-events-none invisible max-h-0 scale-95 opacity-0"
        } min-w-44 p-1`}
      >
        {options.map((item) => {
          const isSelected = selectedValue === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onSelect(item.value);
                closeDropdown();
              }}
              className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 text-left text-sm font-semibold transition-colors duration-200 hover:bg-NeutralBlue-700 focus:bg-NeutralBlue-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-NeutralWhite-0/80 focus-visible:bg-NeutralBlue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-NeutralWhite-0/80"
            >
              <span>{item.label}</span>
              {isSelected && <img src={iconCheckmark} alt="Selected option" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DaysDropdown;
