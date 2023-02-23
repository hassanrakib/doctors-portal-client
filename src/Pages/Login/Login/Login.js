import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="hero py-8 lg:py-0 lg:min-h-screen">
      <div className="hero-content p-0 flex-col">
        <div className="card flex-shrink-0 w-full max-w-sm bg-base-100">
          <div className="card-body">
            <h1 className="text-center text-3xl">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("password", { required: true})}
                />
                {errors.password && (
                  <span className="text-error">This field is required.</span>
                )}
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-accent text-white">Login</button>
              </div>
            </form>
            <p className="text-center mt-2">
              New to Doctors Portal?{" "}
              <Link to="/signup" className="text-secondary">
                Create new account
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

export default Login;
