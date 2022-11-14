import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homepage from "../../Assets/Images/homepage.jpeg";
import "../../Styles/Wallpaper.Module.css";

function Wallpaper() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7070/restaurant/Locations", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setLocations(data.data);
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
        <img
          src={homepage}
          alt="homeimage"
          width="100%"
          height="100%"
          style={{ minHeight: "100%", position: "fixed", top: "0", left: "0" }}
        />
        <div
          className="mainContent"
          style={{
            textAlign: "center",
            backgroundColor: "black",
            padding: "40px",
          }}
        >
          <div style={{ color: "white" }}>
            <h1>Find the best restuarants, cafes and bars</h1>
          </div>
          <div style={{ textAlign: "center" }}>
            <select className="locationDropdown" onChange={fetchRestaurants}>
              <option value="0">Select Location</option>
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
              <ul style={{ listStyleType: "none" }}>
                {restaurants.length !== 0 &&
                  restaurants.map((restaurant) => {
                    return (
                      <Link
                        to={`/Details/${restaurant.name}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li>{restaurant.name}</li>
                      </Link>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallpaper;
