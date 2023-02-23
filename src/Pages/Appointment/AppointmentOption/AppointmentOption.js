import React from "react";

const AppointmentOption = ({ appointmentOption, getCurrentBooking }) => {
  const { name, slots } = appointmentOption;
  return (
    <div className="card lg:w-96 bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-primary text-xl">{name}</h2>
        <p className="mt-1 uppercase">
          {slots.length > 0 ? slots[0] : "No slot Available"}
        </p>
        <p className="mt-1 uppercase">
          {slots.length} {slots.length > 1 ? "spaces" : "space"} Available
        </p>
        <div>
          <label
            onClick={() => getCurrentBooking(appointmentOption)}
            htmlFor="bookingModal"
            className="btn btn-primary text-white"
            disabled={slots.length === 0}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
