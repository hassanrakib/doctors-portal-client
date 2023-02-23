import React from "react";

const Review = ({ review }) => {
  const { avatar, name, location, comment } = review;
  return (
    <div className="card lg:w-96 text-primary-content shadow-lg">
      <div className="card-body">
        <p>{comment}</p>
        <div className="flex items-center mt-4">
            <figure className="w-16 border-2 p-1 border-secondary rounded-full">
                <img src={avatar} alt="avatar" />
            </figure>
            <div className="ml-2">
                <h4 className="text-base font-bold">{name}</h4>
                <p>{location}</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
