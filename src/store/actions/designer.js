import * as actionTypes from './actionTypes';

export const toggleColorPicker = () => {
    return {
        type: actionTypes.TOGGLE_COLORS
    }
}

export const toggleText = () => {
    return {
        type: actionTypes.TOGGLE_TEXT
    }
}