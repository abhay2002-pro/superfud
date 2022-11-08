import React from "react";
import "../../Styles/Wallpaper.Module.css";

export default function MealTypeCard(props) {
  const { name, content, image } = props.item;

  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
      <div className="tileContainer">
        <div className="tileComponent1">
          <img
            src={require(`../../Assets/Images/${image}`)}
            alt=""
            height="150px"
            width="140px"
          />
        </div>
        <div className="tileComponent2">
          <div className="componentHeading">{name}</div>
          <div className="componentSubHeading">{content}</div>
        </div>
      </div>
    </div>
  );
}
