import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Spinner from "../../Shared/Spinner/Spinner";

const ManageDoctors = () => {
  // set the doctor that is going to be deleted
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/doctors", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const doctors = await res.json();
        return doctors;
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleDeleteDoctor = (doctor) => {
    const id = doctor._id;
    fetch(`http://localhost:5000/doctors/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          toast.success("Deletion successful");
          //   refetch after deleting a doctor
          refetch();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl mb-4">Manage Doctors</h1>
      {/* show doctors in a table */}
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={doctor.imageURL} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.email}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <label
                    htmlFor="confirmationModal"
                    onClick={() => setDoctorToDelete(doctor)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Confirmatin Modal */}
      {doctorToDelete && (
        <ConfirmationModal
          title="Are you sure you want to delete?"
          message={`If you delete "${doctorToDelete.name}" whoes email address is "${doctorToDelete.email}", the action can't be undone.`}
          modalData={doctorToDelete}
          successAction={handleDeleteDoctor}
          closeModal={() => setDoctorToDelete(null)}
        />
      )}
    </div>
  );
};

export default ManageDoctors;
