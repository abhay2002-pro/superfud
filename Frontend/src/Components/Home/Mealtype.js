import React, { Component } from "react";

import MealTypeCard from "./MealTypeCard";
import "../../Styles/Wallpaper.Module.css";

export default class Mealtype extends Component {
  constructor() {
    super();
    this.state = {
      mealtypes: [],
    };
    // console.log("Wallpaper constructor is called!")
  }

  componentDidMount() {
    fetch("http://localhost:7070/mealtypes", { method: "GET" })
      .then((response) => response.json())
      .then((data) => this.setState({ mealtypes: data.data }));
  }
  render() {
    let quickSearchList =
      this.state.mealtypes.length &&
      this.state.mealtypes.map((item) => (
        <MealTypeCard item={item} key={item.name}></MealTypeCard>
      ));
    return (
      <div>
        <div className="quicksearch">
          <div className="quicksearchHeading">Quick Searches</div>
          <p className="quicksearchSubHeading">
            Discover restaurants by type of meal
          </p>

          <div className="container-fluid">
            <div className="row">{quickSearchList}</div>
          </div>
        </div>
      </div>
    );
  }
}
