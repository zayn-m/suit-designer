import * as actionType from '../actions/actionTypes';

const initialState = {
    colorPicker: true,
    fontSelector: false
};

const designerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TOGGLE_COLORS:
            return {
                ...state,
                colorPicker: true,
                fontSelector: false
            }

        case actionType.TOGGLE_TEXT:
            return {
                ...state,
                colorPicker: false,
                fontSelector: true
            }
        default:
            return {
                ...state
            };
    }
};

export default designerReducer;
