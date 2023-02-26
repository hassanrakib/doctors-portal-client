import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppointmentOption from "../AppointmentOption/AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";

const AvailableAppointments = ({ date }) => {

  // use of react-query
  const {data:appointmentOptions = []} = useQuery({
    queryKey: ["appointmentOptions"],
    queryFn: () => fetch("http://localhost:5000/appointment-options")
      .then(res => res.json())
  });


  const [booking, setBooking] = useState(null);


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
