import * as actionType from '../actions/actionTypes';

const initialState = {
	text: '',

};

const fontSelectorReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionType.ADD_TEXT:
			return {
				...state,
				text: action.text
			};

		default:
			return {
				...state
			};
	}
};

export default fontSelectorReducer;
