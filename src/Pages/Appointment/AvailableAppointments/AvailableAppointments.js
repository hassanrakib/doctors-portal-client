import React, { useEffect, useState } from "react";
import AppointmentOption from "../AppointmentOption/AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";

const AvailableAppointments = ({ date }) => {
  const [appointmentOptions, setAppointmentOptions] = useState([]);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetch("appointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);

  const getCurrentBooking = (appointmentOption) => {
    setBooking(appointmentOption);
  };
  return (
    <div className="mt-4">
      <h4 className="text-center text-secondary text-xl font-light">
        Available Services on {date}
      </h4>
      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {appointmentOptions.map((appointmentOption) => (
          <AppointmentOption
            key={appointmentOption._id}
            appointmentOption={appointmentOption}
            getCurrentBooking={getCurrentBooking}
          />
        ))}
      </div>
      {booking && <BookingModal booking={booking} setBooking={setBooking} date={date} />}
    </div>
  );
};

export default AvailableAppointments;
