import * as actionTypes from './actionTypes';


export const addText = (text) => {
	return {
		type: actionTypes.ADD_TEXT,
		text: text
	};
};
