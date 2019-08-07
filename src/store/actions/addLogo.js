import * as actionTypes from "./actionTypes";

export const addLogo = img => {
  return {
    type: actionTypes.ADD_LOGO,
    img: img
  };
};
