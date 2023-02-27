import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AppointmentOption from "../AppointmentOption/AppointmentOption";
import BookingModal from "../BookingModal/BookingModal";
import Spinner from "../../Shared/Spinner/Spinner";

const AvailableAppointments = ({ date }) => {
  // use of react-query
  const { data: appointmentOptions = [], isLoading, refetch } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(`http://localhost:5000/v2/appointment-options?date=${date}`).then(
        (res) => res.json()
      ),
  });

  const [booking, setBooking] = useState(null);

  const getCurrentBooking = (appointmentOption) => {
    setBooking(appointmentOption);
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="mt-4">
      <h4 className="text-center text-secondary text-xl font-light">
        Available Services on {date}
      </h4>
      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {appointmentOptions?.map((appointmentOption) => (
          <AppointmentOption
            key={appointmentOption._id}
            appointmentOption={appointmentOption}
            getCurrentBooking={getCurrentBooking}
          />
        ))}
      </div>
      {booking && (
        <BookingModal
          booking={booking}
          setBooking={setBooking}
          date={date}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AvailableAppointments;
