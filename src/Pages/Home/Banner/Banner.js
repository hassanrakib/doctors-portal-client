import React from "react";
import chair from "../../../assets/images/chair.png";
const Banner = () => {
  return (
    <div className="hero lg:py-12">
      <div className="hero-content flex-col lg:flex-row-reverse lg:gap-x-11">
        <img
          src={chair}
          className="lg:max-w-xl rounded-lg shadow-2xl"
          alt="chair"
        />
        <div>
          <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
          <p className="py-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </p>
          <button className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
