import React from 'react';
import './ColorPicker.css';
import { CirclePicker } from 'react-color';

const popover = {
	position: 'absolute',
	zIndex: '2'
};
const cover = {
	position: 'fixed',
	top: '0px',
	right: '0px',
	bottom: '0px',
	left: '0px'
};

const colorPicker = (props) => (
	<div style={popover} className="color-picker border">
		<div style={cover} onClick={props.handleDisplayColorClose} />
		<div className="m-3">
			<label>Speedsy Colors</label>
			<hr />
			<CirclePicker onChangeComplete={props.handleChangeComplete} />
		</div>
	</div>
);

export default colorPicker;
