import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import useToken from "../../../hooks/useToken";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);

  const [signupError, setSignupError] = useState(null);

  // get the email of the created user
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const { token } = useToken(createdUserEmail);

  // if token exists
  if (token) {
    // navigate to homepage after successfull signup
    navigate("/", { replace: true });

    // show success message
    toast.success("User created successfully");
  }

  const saveUserToDB = async (name, email) => {
    return fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => res.json());
  };

  const onSubmit = (data) => {
    // clear the error for every submit
    setSignupError(null);

    const name = data.name;
    const email = data.email;
    const password = data.password;

    // sign up the user
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        // update user profile in firebase
        updateUserProfile({ displayName: name });
      })
      .then(() => {
        // if updateUserProfile resolves
        console.log("User profile updated!");

        // save user to database
        return saveUserToDB(name, email);
      })
      .then((result) => {
        if (result.acknowledged) {
          // if successfully saved to database
          // set email to get token
          setCreatedUserEmail(email);
        }
      })
      .catch((error) => {
        console.log(error);
        setSignupError(error);
      });
  };

  return (
    <div className="hero py-8 lg:py-0 lg:min-h-screen">
      <div className="hero-content p-0 flex-col">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <h1 className="text-center text-3xl">Sign Up</h1>
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
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters long.",
                    },
                    pattern: {
                      value:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8}/,
                      message:
                        "Password must have uppercase, lowercase, number and special character.",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-error text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent text-white">
                  Sign up
                </button>
                {signupError && (
                  <p className="text-xs text-error">{signupError.message}</p>
                )}
              </div>
            </form>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </p>
            <div className="divider">OR</div>
            <button className="btn btn-outline w-full">
              CONTINUE WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
