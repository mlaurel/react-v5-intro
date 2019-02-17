import React, { useState, useEffect } from "react";
import pf, { ANIMALS } from "petfinder-client";
import useDropdown from "./useDropdown";
import Results from "./Results";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams = () => {
  const [location, updateLocation] = useState("Seattle, WA");
  const [breeds, updateBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const res = await petfinder.pet.find({
      location,
      breed,
      animal,
      output: "full"
    });

    setPets(
      Array.isArray(res.petfinder.pets.pet)
        ? res.petfinder.pets.pet
        : [res.petfinder.pets.pet]
    );
  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed("");

    petfinder.breed.list({ animal }).then(data => {
      updateBreeds(
        Array.isArray(data.petfinder.breeds.breed)
          ? data.petfinder.breeds.breed
          : [data.petfinder.breeds.breed]
      );
    }, console.error);
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
