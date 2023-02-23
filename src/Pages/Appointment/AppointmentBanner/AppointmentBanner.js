import { DayPicker } from "react-day-picker";
import chair from "../../../assets/images/chair.png";

const AppointmentBanner = ({selected, setSelected}) => {

  return (
    <div className="lg:py-12">
      <div className="hero-content flex-col lg:flex-row-reverse lg:justify-evenly lg:gap-x-11">
        <img
          src={chair}
          className="lg:max-w-xl rounded-lg shadow"
          alt="chair"
        />
        <div className="shadow-lg rounded-lg">
          <DayPicker mode="single" selected={selected} onSelect={setSelected} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
