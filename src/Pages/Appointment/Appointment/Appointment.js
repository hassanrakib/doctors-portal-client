import { format } from "date-fns";
import React, { useState } from "react";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import AvailableAppointments from "../AvailableAppointments/AvailableAppointments";

const Appointment = () => {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <AppointmentBanner selected={selected} setSelected={setSelected} />
      <AvailableAppointments date={format(selected, "PP")} />
    </div>
  );
};

export default Appointment;
