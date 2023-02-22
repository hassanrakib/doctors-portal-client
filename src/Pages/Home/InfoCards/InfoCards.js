import React from "react";
import clock from "../../../assets/icons/clock.svg";
import marker from "../../../assets/icons/marker.svg";
import phone from "../../../assets/icons/phone.svg";
import InfoCard from "../InfoCard/InfoCard";

const InfoCards = () => {
  const cardsData = [
    {
      id: 1,
      title: "Opening Hours",
      description: "Lorem Ipsum is simply dummy text of the pri",
      img: clock,
      bgClass: "bg-gradient-to-r from-secondary to-primary",
    },
    {
      id: 2,
      title: "Visit Our Location",
      description: "Brooklyn, NY 10036, United States",
      img: marker,
      bgClass: "bg-accent",
    },
    {
      id: 3,
      title: "Contact Us Now",
      description: "+000 123 456789",
      img: phone,
      bgClass: "bg-gradient-to-r from-secondary to-primary",
    },
  ];
  return (
    <div className="grid lg:grid-cols-3 gap-4 mt-4">
      {cardsData.map((cardData) => (
        <InfoCard key={cardData.id} cardData={cardData} />
      ))}
    </div>
  );
};

export default InfoCards;
