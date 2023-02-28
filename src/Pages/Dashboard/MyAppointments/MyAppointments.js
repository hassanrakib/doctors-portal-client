import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import Spinner from "../../Shared/Spinner/Spinner";

const MyAppointments = () => {
  const {
    user: { email }, logout
  } = useContext(AuthContext);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", email],
    queryFn: () =>
      fetch(`http://localhost:5000/bookings?email=${email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      })
        .then((res) => {
          // if the token is invalid for some reason
          if (res.status === 403 || res.status === 401) {
            logout();
            return [];
          } else {
            return res.json();
          }
        }),
  });

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      <h1 className="text-3xl mb-6">My Appointments</h1>
      {/* show appointments */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.patientName}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointments;
