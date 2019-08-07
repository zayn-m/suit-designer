import React from "react";
import "./ColorPicker.css";
import { CirclePicker } from "react-color";

const popover = {
  position: "absolute",
  zIndex: "2"
};
const cover = {
  position: "fixed",
  top: "0px",
  right: "0px",
  bottom: "0px",
  left: "0px"
};

// var main = [ '#000', '#eee','#EFDA46','#f90000', ];
// var collar = ['#EFDA46','#f90000', '#ccc', '#eee'];

const main = ["#2b2b2b", "#293f8a", "#E7E7E7", "#c40000"];
const others = [
  "#2b2b2b",
  "#293f8a",
  "#E7E7E7",
  "#c40000",
  "#b88b06",
  "#0b850b",
  "#bd7708",
  "#6c10a1",
  "#ccc",
  "#0e739c",
  "#2a62b0",
  "#a60798",
  "#145e02",
  "#7da148",
  "#baba29",
  "#6fba29",
  "#ba7e29"
];
const font = [
  "#eee",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b"
];

const colorPicker = props => (
  <div style={popover} className="color-picker border">
    <div style={cover} onClick={props.handleDisplayColorClose} />
    <div className="m-3">
      <label>Speedsy Colors</label>
      <hr />
      <CirclePicker
        colors={props.main ? main : props.font ? font : others}
        onChangeComplete={props.handleChangeComplete}
      />
    </div>
  </div>
);

export default colorPicker;
