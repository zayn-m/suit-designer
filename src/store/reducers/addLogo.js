import * as actionType from "../actions/actionTypes";

const initialState = {
  imgs: []
};

const addLogoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_LOGO:
      let images = state.imgs;
      images.push(action.img);

      return {
        ...state,
        imgs: images
      };

    default:
      return {
        ...state
      };
  }
};

export default addLogoReducer;
