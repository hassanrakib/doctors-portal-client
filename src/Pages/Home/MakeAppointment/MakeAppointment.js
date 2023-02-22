import React from "react";
import doctor from "../../../assets/images/doctor-small.png";
import makeAppointmentBackground from "../../../assets/images/appointment.png";

const MakeAppointment = () => {
  return (
    <div
      className="hero mt-28 bg-accent text-white lg:px-8"
      style={{ background: `url(${makeAppointmentBackground})` }}
    >
      <div className="hero-content flex-col lg:flex-row gap-7 lg:pb-0">
        <img
          src={doctor}
          className="hidden lg:block lg:max-w-md -mt-20"
          alt="doctor"
        />
        <div>
          <h4 className="mb-4 font-bold text-primary text-base">Appointment</h4>
          <h1 className="text-5xl font-bold">Make an appointment Today</h1>
          <p className="py-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeAppointment;
