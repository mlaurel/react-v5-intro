import React from "react";

const Pet = props => {
  const { name, animal, breed, media, location, id } = props;
  let photos = [];
  if (media && media.photos && media.photos.photo) {
    photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
  }

  let hero = "http://placecorgi.com/300/300";
  if (photos[0] && photos[0].value) {
    hero = photos[0].value;
  }

  return (
    <a href={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </a>
  );
};

export default Pet;
