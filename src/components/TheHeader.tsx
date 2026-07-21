import logo from "../assets/images/logo.svg";
import iconUnits from "../assets/images/icon-units.svg";
import DropdownButton from "../components/ui/DropdownButton";

function TheHeader() {
  return (
    <>
      <header className="bg-NeutralBlue-900 fixed top-0 inset-x-0 z-20 flex gap-4 items-center justify-between p-4 lg:px-20 lg:pt-12">
        <img src={logo} alt="Logo" className="w-34 lg:w-52" />

        <DropdownButton
          iconStart={iconUnits}
          altIconStart="Units icon"
          text="Units"
        />
    </header>
    </>
  );
}

export default TheHeader;
