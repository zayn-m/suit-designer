import * as actionType from "../actions/actionTypes";

const initialState = {
  text: "",
  code: "#eee",
  outlineColor: "#fff",
  style: "",
  size: 52
};

const fontSelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TEXT:
      return {
        ...state,
        text: action.text
      };
    case actionType.COLOR:
      return {
        ...state,
        code: action.code
      };
    case actionType.OUTLINE_COLOR:
      return {
        ...state,
        outlineColor: action.color
      };
    case actionType.STYLE:
      return {
        ...state,
        style: action.style
      };
    case actionType.SIZE:
      return {
        ...state,
        size: action.size
      };
    default:
      return {
        ...state
      };
  }
};

export default fontSelectorReducer;
