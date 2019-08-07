import * as actionType from "../actions/actionTypes";

const initialState = {
  colorPicker: true,
  fontSelector: false,
  addLogo: false
};

const designerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_COLORS:
      return {
        ...state,
        colorPicker: true,
        fontSelector: false,
        addLogo: false
      };
    case actionType.TOGGLE_TEXT:
      return {
        ...state,
        colorPicker: false,
        fontSelector: true,
        addLogo: false
      };
    case actionType.TOGGLE_LOGO:
      return {
        ...state,
        colorPicker: false,
        fontSelector: false,
        addLogo: true
      };

    default:
      return {
        ...state
      };
  }
};

export default designerReducer;
