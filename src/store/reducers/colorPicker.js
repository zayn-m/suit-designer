import * as actionType from '../actions/actionTypes';

const initialState = {
    toggle: true
};

const colorPickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.TOGGLE_COLORS:
            return {
                ...state,
                toggle: !state.toggle
            }

        default:
            return {
                ...state
            };
    }
};

export default colorPickerReducer;
