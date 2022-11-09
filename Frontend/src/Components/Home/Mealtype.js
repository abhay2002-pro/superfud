import React, { useEffect, useState } from "react";
import MealTypeCard from "./MealTypeCard";
import "../../Styles/Wallpaper.Module.css";

function Mealtype() {
  const [mealtypes, setMealtypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7070/mealtypes", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setMealtypes(data.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="quicksearch">
        <div className="quicksearchHeading">Quick Searches</div>
        <p className="quicksearchSubHeading">
          Discover restaurants by type of meal
        </p>

        <div className="container-fluid">
          <div className="row">
            {mealtypes.length!==0 && mealtypes.map(meal => {
                return <MealTypeCard item={meal} key={meal.name}/>
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mealtype;
