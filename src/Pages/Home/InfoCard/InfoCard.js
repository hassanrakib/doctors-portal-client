import React from "react";

const InfoCard = ({cardData}) => {
  return (
    <div className={`card card-side ${cardData.bgClass} shadow-xl text-white pl-3`}>
      <figure>
        <img
          src={cardData.img}
          alt={cardData.title}
        />
      </figure>
      <div className="card-body py-5">
        <h2 className="card-title">{cardData.title}</h2>
        <p>{cardData.description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
