import React from "react";
import quote from "../../../assets/icons/quote.svg";
import people1 from "../../../assets/images/people1.png";
import Review from "../Review/Review";
const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      location: "California",
      avatar: people1,
      comment:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 2,
      name: "Winson Herry",
      location: "California",
      avatar: people1,
      comment:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
    {
      _id: 3,
      name: "Winson Herry",
      location: "California",
      avatar: people1,
      comment:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
    },
  ];
  return (
    <section className="mt-20">
      <div className="flex flex-row justify-between items-center lg:items-start">
        <div>
          <h4 className="mb-4 font-bold text-primary text-base">Testimonial</h4>
          <h2 className="text-3xl font-light">What Our Patients Says</h2>
        </div>
        <figure className="w-14 md:w-16 lg:w-36">
          <img src={quote} alt="quote" />
        </figure>
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
