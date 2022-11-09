import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homepage from "../../Assets/Images/homepage.png";
import "../../Styles/Wallpaper.Module.css";

function Wallpaper() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7070/restaurant/Locations", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.data);
        console.log(data);
        console.log(locations);
      });
  }, []);

  const fetchRestaurants = (event) => {
    fetch(`http://localhost:7070/restaurant/${event.target.value}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRestaurants(data.data);
      });
  };
  return (
    <>
      <div>
        <img src={homepage} alt="homeimage" width="100%" height="450px" />
        <div className="logo">e!</div>
        <div className="headings">
          Find the best restuarants, cafes and bars
        </div>
        <div className="locationSelector">
          <select className="locationDropdown" onChange={fetchRestaurants}>
            <option value="0">Select</option>
            {locations.length !== 0 &&
              locations.map((location) => {
                return (
                  <option value={location.city_id} key={location.name}>
                    {location.name}
                  </option>
                );
              })}
          </select>
          <div id="notebooks">
            <input
              className="restaurantsinput"
              type="text"
              placeholder="Search Restaurant"
            />
            <ul>
              {restaurants.length !== 0 &&
                restaurants.map((restaurant) => {
                  return (
                    <li>
                      <Link to={`/Details/${restaurant.name}`}>
                        {" "}
                        {restaurant.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallpaper;
