import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const BookingModal = ({ booking, setBooking, date, refetch}) => {

  const { user } = useContext(AuthContext);
  const { name, slots, price } = booking;
  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const slot = form.slot.value;
    const patientName = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const bookingInformation = {
      appointmentDate: date,
      slot,
      treatment: name,
      patientName,
      phone,
      email,
      price,
    };

    // save booking to db
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingInformation),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          // give success message
          toast.success(`Appointment at ${slot} in ${date} confirmed!`);

          // close the modal
          setBooking(null);

          // after successful booking refetch the appointmentOptions
          refetch();
        } else {
          // if booking is declined from the backend
          toast.error(result.message);
        }
      });
  };
  return (
    <>
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="bookingModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          {/* form */}
          <div className="hero mt-4">
            <div className="card flex-shrink-0 w-full">
              <form onSubmit={handleBooking} className="card-body p-0">
                <input
                  type="text"
                  className="input input-bordered"
                  value={date}
                  readOnly
                  disabled
                />
                <select name="slot" className="select select-bordered w-full">
                  {slots?.map((slot) => (
                    <option key={Math.random()} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  defaultValue={user?.displayName}
                  disabled
                />
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  defaultValue={user?.email}
                  disabled
                />
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
