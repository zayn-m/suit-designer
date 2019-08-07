import * as actionTypes from "./actionTypes";

export const addText = text => {
  return {
    type: actionTypes.ADD_TEXT,
    text: text
  };
};
export const changeColor = code => {
  return {
    type: actionTypes.COLOR,
    code: code
  };
};
export const changeoutlineColor = color => {
  return {
    type: actionTypes.OUTLINE_COLOR,
    color: color
  };
};

export const fontStyle = style => {
  return {
    type: actionTypes.STYLE,
    style: style
  };
};

export const fontSize = size => {
  return {
    type: actionTypes.SIZE,
    size: size
  };
};
