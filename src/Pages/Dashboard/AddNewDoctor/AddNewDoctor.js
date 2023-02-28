import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNewDoctor = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: specialties = [] } = useQuery({
    queryKey: ["specialties"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/specialties");
      const data = await res.json();
      return data;
    },
  });

  const saveNewDoctorToDB = async (newDoctor) => {
    return fetch(`http://localhost:5000/doctors`, {
      method: "POST",
      headers: {
        // send authorization header as it is an admin action
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDoctor),
    }).then((res) => res.json());
  };

  const imgBB_apiKey = process.env.REACT_APP_imgBB_apiKey;

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const specialty = data.specialty;

    // host image to imgBB
    // send image by wrapping in FormData
    const image = data.image[0];
    const formData = new FormData();
    // the key has to be "image" for the image in the formData object to be recognized by the imgBB
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imgBB_apiKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((dataFromImgBB) => {
        if (dataFromImgBB.success) {
          // after successfully uploading and getting image url from imgBB
          const imageURL = dataFromImgBB.data.url;

          // create a doctor object
          const newDoctor = {
            name,
            email,
            specialty,
            imageURL,
          };

          // save doctor to DB
          return saveNewDoctorToDB(newDoctor);
        }
      })
      .then((result) => {
        if (result.acknowledged) {
          toast.success(`${name} is added as a specialist of ${specialty}.`);

          // after successfully saving new doctor to db
          navigate("/dashboard/manage-doctors");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <h1 className="text-3xl mb-4">Add a New Doctor</h1>
      <div className="card flex-shrink-0 w-full max-w-sm border-2">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", {
                  required: "This field is required",
                  maxLength: {
                    value: 20,
                    message: "Name can't exceed 20 characters.",
                  },
                })}
              />
              {errors.name && (
                <span className="text-error">{errors.name.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", {
                  required: "This field is required.",
                })}
              />
              {errors.email && (
                <span className="text-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Specialty</span>
              </label>
              <select
                name="specialty"
                className="select select-bordered w-full max-w-xs"
                {...register("specialty")}
              >
                {specialties.map((specialty) => (
                  <option key={specialty._id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                placeholder="Choose photo"
                {...register("image", {
                  required: "This field is required",
                })}
              />
              {errors.photo && (
                <span className="text-error">{errors.photo.message}</span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent text-white">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDoctor;
