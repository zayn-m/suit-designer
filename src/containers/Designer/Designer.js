import React from 'react';
import './Designer.css';
import {connect} from 'react-redux'
import { fabric } from 'fabric';
import $ from 'jquery';
import { CirclePicker } from 'react-color';
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import ReactImageZoom from 'react-image-zoom';
import * as actions from '../../store/actions/index';

import ColorPicker from '../../components/ColorPicker/ColorPicker';
import FontSelector from '../../components/FontSelector/FontSelector';

import ProductMain from '../../assets/images/product/outline.png';
import ProductCollar from '../../assets/images/product/second.png';
import Img from '../../assets/images/product/product1-main.png';

import Suit1 from '../../assets/images/product/suit.png';
import Suit2 from '../../assets/images/product/suit1.png';
import collar1 from '../../assets/images/product/COLAR 1.png';
import collar2 from '../../assets/images/product/COLAR 2.png';
import Dummy from '../../assets/images/product/dummy.png'
import Texture from '../../assets/images/product/suit/texture.png';
import Main from '../../assets/images/product/suit/suit-base.png';
import Second from '../../assets/images/product/suit/strip1.png';
import Third from '../../assets/images/product/suit/strip2.png';
import Fourth from '../../assets/images/product/suit/knees.png';
import Collar from '../../assets/images/product/suit/collar.png';
import Belt from '../../assets/images/product/suit/belt.png';


import {res} from './FilterGenerator';

var colors = [ '#000', '#186df5', '#fff', '#ccc', '#c91808' ];

// for (let i = 0; i < 30; i++) {
// 	var letters = '0123456789ABCDEF';

// 	// html color code starts with #
// 	var color = '#'; // generating 6 times as HTML color code consist

// 	// of 6 letter or digits
// 	for (let j = 0; j < 6; j++) {
// 		color += letters[Math.floor(Math.random() * 16)];
// 	}
// 	colors.push(color.toString());
// 	console.log(colors);
// }

const imgProps = {"width":350,"height": 700,"scale":1.5,"offset":{"vertical":0,"horizontal":10}};


class Designer extends React.Component {
	state = {
		image: null,
		output: '',
		products: {
			main: {
				imgs: [
					{
						color: 'black',
						src: Suit1
					},
					{
						color: 'white',
						src: Suit2
					}
				]
			}
		} ,
		colors: {
			mainColor: {
				displayColorPicker: false,
				color: '#000',
				selectedColor: ''
			},
			secondColor: {
				displayColorPicker: false,
				color: '#000',
				selectedColor: '',
				startingColor: 'invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)'
			},
			thirdColor: {
				displayColorPicker: false,
				color: '#36548D',
				selectedColor: '',
				startingColor: 'invert(12%) sepia(87%) saturate(4411%) hue-rotate(357deg) brightness(91%) contrast(120%)'
			},
			fourthColor: {
				displayColorPicker: false,
				color: '#2B324A',
				selectedColor: '',
				startingColor: 'invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)'
			},
			collarColor: {
				displayColorPicker: false,
				color: '#BD2130',
				selectedColor: '',
				startingColor: 'invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)'
			},
			beltColor: {
				displayColorPicker: false,
				color: '#BD2130',
				selectedColor: '',
				startingColor: 'invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)'
			}
		},
		mainImg: Suit2,
		collar: collar1,
		activeColor: true,
		activeText: false
	};

	componentDidMount() {
		console.log(this.props.insertedText);
		// Make a New Canvas
		this.__canvas = new fabric.Canvas('meCanvas', {
			preserveObjectStacking: true
		});
		this.__canvas.on({
			'object:selected': this.onSelectTextElement
		});
		// setTimeout(() => {
		// 	this.setState({ image: this.props.location.state.image });
		// }, 1000);
		// this.addNewImageElement(this.props.location.state.image);
	}

	addText() {

		let newID = new Date().getTime().toString().substr(5);
		let text = new fabric.IText(this.props.insertedText, {
			fontFamily: 'arial black',
			left: 100,
			top: 100,
			myid: newID,
			objecttype: 'text'
		});
		// text.setControlsVisibility(this.state.controls);
		text.setColor('#ccc');
		this.__canvas.add(text);
		this.__canvas.setActiveObject(text);
		//this.addLayer(newID, 'text');
	}

	delText = () => {
		const activeObject = this.__canvas.getActiveObject();
		if (activeObject) return this.__canvas.remove(activeObject);
		return null;
	};

	addNewImageElement() {
		// var canvas = new fabric.StaticCanvas('meCanvas');
		// var image;
		// var imgEl = document.createElement('img');
		// imgEl.crossOrigin = 'anonymous';
		// imgEl.onload = function() {
		// 	image = new fabric.Image(imgEl);

		// 	canvas.add(image);
		// };
		// imgEl.src = ProductMain;
		// image.filters[0].rotation = 1;
		// console.log(image.filters[0].rotation);
		// image.applyFilters();
		// canvas.requestRenderAll();

		fabric.util.loadImage(Img, (img) => {
			const legimg = new fabric.Image(img, {
				left: 0,
				top: 0,
				width: img.width / 1,
				height: img.height / 1,
				lockUniScaling: true
			});
			legimg.filters.rotation = 1.23123213;
			console.log(legimg.filters.rotation);
			legimg.fill = 'rgb(232,43,123'
			legimg.applyFilters();
			this.__canvas.add(legimg);
			this.__canvas.bringToFront(legimg);
			this.__canvas.renderAll();
		});
	}

	setCanvasImage(canvasImage) {
		self = this;
		if (canvasImage) {
			this.__canvas.setBackgroundColor({ source: canvasImage, repeat: 'repeat' }, function() {
				self.__canvas.renderAll();
			});
		}
	}

	handleCanvasClick = (e) => {
		console.log('clicked');
		const ne = e.nativeEvent;
		const bb = this.refs.myFabric.getBoundingClientRect();
		const x = Math.round(ne.clientX - bb.left);
		const y = Math.round(ne.clientY - bb.top);
		this.setState({ output: 'clicked @ ' + x + ', ' + y });
	};

	handleChangeComplete = (color, event, layer) => {
		if (layer === 'mainColor') {
			this.updateColorState(layer, color.hex, false);

		}
		if (layer === 'secondColor') {
			this.updateColorState(layer, color.hex, false);
		}

		if (layer === 'thirdColor') {
			this.updateColorState(layer, color.hex, false);
		}

		if (layer === 'fourthColor') {
			this.updateColorState(layer, color.hex, false);
		}

		if (layer === 'collarColor') {
			this.updateColorState(layer, color.hex, false);
		}

		if (layer === 'beltColor') {
			this.updateColorState(layer, color.hex, false);
		}
	};

	handleDisplayColorClick = (layer) => {
		if (layer === 'mainColor') {
			this.updateColorState(layer, null, true);
		}
		if (layer === 'secondColor') {
			this.updateColorState(layer, null, true);
		}

		if (layer === 'thirdColor') {
			this.updateColorState(layer, null, true);
		}

		if (layer === 'fourthColor') {
			this.updateColorState(layer, null, true);
		}

		if (layer === 'collarColor') {
			this.updateColorState(layer, null, true);
		}

		if (layer === 'beltColor') {
			this.updateColorState(layer, null, true);
		}
	};

	handleDisplayColorClose = (layer) => {
		if (layer === 'mainColor') {
			this.updateColorState(layer, null, false);
		}
		if (layer === 'secondColor') {
			this.updateColorState(layer, null, false);
		}

		if (layer === 'thirdColor') {
			this.updateColorState(layer, null, false);
		}

		if (layer === 'fourthColor') {
			this.updateColorState(layer, null, false);
		}

		if (layer === 'collarColor') {
			this.updateColorState(layer, null, false);
		}

		if (layer === 'beltColor') {
			this.updateColorState(layer, null, false);
		}
	};

	updateColorState = (key, code, colorPicker) => {
		if (key && code) {
			const r = res(code);
			const filter = r.filter.split(':')[1].split(';')[0];
			console.log('if');
			this.setState((prevState) => ({
				...prevState,
				colors: {
					...prevState.colors,
					[key]: {
						...prevState.colors.key,
						color: code,
						displayColorPicker: true,
						selectedColor: filter
					}
				}
			}));
		} else {
			console.log('else');
			this.setState((prevState) => ({
				...prevState,
				colors: {
					...prevState.colors,
					[key]: {
						...prevState.colors.key,
						color: prevState.colors[key].color,
						displayColorPicker: colorPicker,
						startingColor: prevState.colors[key].startingColor,
						selectedColor: prevState.colors[key].selectedColor
					}
				}
			}));
		}
	};

	showColorPicker = () => {
		this.props.toggleColorPicker();

	}

	render() {

		return (
			<section className="container  mt-5 configurator-container">

				<div className="header bg-danger">
					<h1 className="text-center text-white" id="title">
						Product Configurator
					</h1>
					<span className="text-center text-white">R A C E W E A R</span>
				</div>

				<div className="row configurator">
					<div className="col-1 ">
						<div className="col-12 preview-box" />
						<div className="col-12 preview-box" />
						<div className="col-12 preview-box" />
						<div className="col-12 preview-box" />
					</div>
					<div id="canvas-wrap" className="col-7 border ">
						<canvas
							className="canvas "
							height={580}
							id="meCanvas"
							ref="myFabric"
							style={{ zIndex: 999 }}
							onClick={(e) => this.handleCanvasClick(e)}
						/>
						<div className="col-12 product " id="overlay">
							<div className="row mt-3 ">

								<div className="col-11 mx-auto ">

									{/*<ReactImageZoom*/}
									{/*	{...imgProps}*/}
									{/*	img={Main}*/}
									{/*/>*/}
									<img
										className="img-fluid"
										src={Main}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Main,
											position: 'absolute',
											filter: this.state.colors.mainColor.selectedColor
										}}
										alt="product"
										/>
									<img
										className="img-fluid"
										src={Second}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Second,
											position: 'absolute',
											filter: this.state.colors.secondColor.selectedColor === '' ? this.state.colors.secondColor.startingColor : this.state.colors.secondColor.selectedColor
										}}
										alt="product"
									/>
									<img
										className="img-fluid"
										src={Third}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Third,
											position: 'absolute',
											filter: this.state.colors.thirdColor.selectedColor === '' ? this.state.colors.thirdColor.startingColor : this.state.colors.thirdColor.selectedColor
										}}
										alt="product"
									/>
									<img
										className="img-fluid"
										src={Fourth}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Fourth,
											position: 'absolute',
											filter: this.state.colors.fourthColor.selectedColor === '' ? this.state.colors.fourthColor.startingColor : this.state.colors.fourthColor.selectedColor
										}}
										alt="product"
									/>
									<img
										className="img-fluid"
										src={Collar}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Collar,
											position: 'absolute',
											filter: this.state.colors.collarColor.selectedColor === '' ? this.state.colors.collarColor.startingColor : this.state.colors.collarColor.selectedColor
										}}
										alt="product"
									/>
									<img
										className="img-fluid"
										src={Belt}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Belt,
											position: 'absolute',
											filter: this.state.colors.beltColor.selectedColor === '' ? this.state.colors.beltColor.startingColor : this.state.colors.beltColor.selectedColor
										}}
										alt="product"
									/>	<img
										className="img-fluid"
										src={Texture}
										style={{
											marginLeft: '-10rem',
											width: '18rem',
											height: '40rem',
											backgroundImage: Texture,
											position: 'absolute',
										}}
										alt="product"
									/>

									{/*<img*/}
									{/*	id='collar'*/}
									{/*	className="img-fluid"*/}
									{/*	src={this.state.collar}*/}
									{/*	style={{*/}
									{/*		marginLeft: '-10rem',*/}
									{/*		width: '18rem',*/}
									{/*		height: '40rem',*/}
									{/*		backgroundImage: this.state.collar,*/}
									{/*		position: 'absolute',*/}
									{/*		filter:  this.state.colors.collarColor.selectedColor*/}
									{/*	}}*/}
									{/*	alt="product"*/}
									{/*/>*/}
								</div>

							</div>
						</div>
					</div>
					{/* <div className="col-7 product ">
						{this.state.image !== null ? (
							<div className="row mt-3">
								<div className="col-11 mx-auto">
									<img className="img-fluid" src={this.props.location.state.image} alt="product" />
								</div>
							</div>
						) : (
							<div style={{ marginTop: '15rem' }}>
								<h1 className="text-center">Loading...</h1>
							</div>
						)}
					</div> */}
					<div className="col-4 controls">
						<div className="row">
							<div className="col-2">
								{/* <span>
									<i className="mt-4 fas fa-pencil-alt fa-2x" />
									Design
								</span> */}
								<span style={{cursor: 'pointer'}} onClick={this.showColorPicker}>
									<i className="mt-4 fas fa-palette fa-2x" />
									Color
								</span>
								<span style={{cursor: 'pointer'}} onClick={this.props.toggleText}>
									<i className="mt-4 fas fa-font fa-2x" />
									Text
								</span>
								<span onClick={() => this.addNewImageElement()}>
									<i className="mt-4 fas fa-image fa-2x" />
									Logo
								</span>
							</div>
							<div className="col-9 ml-1 controls-panel border">
								<div className="col-12 mt-3 mb-2 ">
									<FontSelector  insert={() => this.addText()} />
									{this.props.colorPicker &&
									<div>
										<div className="row ">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.mainColor.color
													}}
													onClick={() => this.handleDisplayColorClick('mainColor')}
												/>
												{this.state.colors.mainColor.displayColorPicker ? (
													<ColorPicker
														main
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('mainColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'mainColor')}
													/>
												) : null}
												<span>Main Color</span>
											</div>
										</div>
										<div className="row ">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.secondColor.color
													}}
													onClick={() => this.handleDisplayColorClick('secondColor')}
												/>
												{this.state.colors.secondColor.displayColorPicker ? (
													<ColorPicker
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('secondColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'secondColor')}
													/>
												) : null}
												<span>Second Color</span>
											</div>
										</div>
										<div className="row">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.thirdColor.color
													}}
													onClick={() => this.handleDisplayColorClick('thirdColor')}
												/>
												{this.state.colors.thirdColor.displayColorPicker ? (
													<ColorPicker
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('thirdColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'thirdColor')}
													/>
												) : null}
												<span>Third Color</span>
											</div>
										</div>
										<div className="row ">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.fourthColor.color
													}}
													onClick={() => this.handleDisplayColorClick('fourthColor')}
												/>
												{this.state.colors.fourthColor.displayColorPicker ? (
													<ColorPicker
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('fourthColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'fourthColor')}
													/>
												) : null}

												<span>Fourth Color</span>
											</div>
										</div>
										<div className="row ">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.collarColor.color
													}}
													onClick={() => this.handleDisplayColorClick('collarColor')}
												/>
												{this.state.colors.collarColor.displayColorPicker ? (
													<ColorPicker
														collar
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('collarColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'collarColor')}
													/>
												) : null}
												<span>Collar Color</span>
											</div>
										</div>
										<div className="row ">
											<div className="col-9 mt-2">
												<div
													style={{
														width: '9rem',
														height: '2rem',
														cursor: 'pointer',
														backgroundColor: this.state.colors.beltColor.color
													}}
													onClick={() => this.handleDisplayColorClick('beltColor')}
												/>
												{this.state.colors.beltColor.displayColorPicker ? (
													<ColorPicker
														handleDisplayColorClose={() =>
															this.handleDisplayColorClose('beltColor')}
														handleChangeComplete={(color, event) =>
															this.handleChangeComplete(color, event, 'beltColor')}
													/>
												) : null}

												<span>Belt Color</span>
											</div>
										</div>
									</div>
									}
									{/*<TwitterPicker*/}
									{/*	triangle="top-left"*/}
									{/*	colors={colors}*/}
									{/*	onSwatchHover={this.handleChangeComplete}*/}
									{/*/>*/}
								</div>
							</div>
						</div>
						<div className="row controls-footer">
							<div className="controls-footer__btn ml-auto">
								<button className="btn m-3 bg-danger text-white text-bold">Add to Cart</button>
								<button className="btn m-3 bg-danger text-white text-bold">Preview</button>
							</div>
						</div>
					</div>
				</div>

				{/* <button id="texts" onClick={() => this.addNewImageElement()}>
            ADD IMAGE
        </button>
        <button id="texts" onClick={() => this.addText()}>
            TEXT PLEASE
        </button>
        <button id="del_text" onClick={() => this.delText()}>
            DELETE
        </button>
        <canvas
            style={{ border: '1px solid red' }}
            id="meCanvas"
            ref="myFabric"
            onClick={(e) => this.handleCanvasClick(e)}
        />
        <p>{this.state.output}</p> */}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		colorPicker: state.designerReducer.colorPicker,
		insertedText: state.fontSelectorReducer.text
	}
}

const mapDispatchToProps = dispatch => {
	return {
		toggleColorPicker: () => dispatch(actions.toggleColorPicker()),
		toggleText: () => dispatch(actions.toggleText())
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Designer);
