import React from "react";

const layer = props => (
  <img
    className="img-fluid"
    src={props.img}
    style={{
      marginLeft: "-10rem",
      width: "18rem",
      height: "40rem",
      backgroundImage: props.img,
      position: "absolute",
      filter:
        props.selectedColor === "" ? props.startingColor : props.selectedColor
    }}
    alt=""
  />
);

export default layer;
