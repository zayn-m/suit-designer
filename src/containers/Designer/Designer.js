import React from 'react';
import './Designer.css';
import { fabric } from 'fabric';
import { CirclePicker } from 'react-color';

import ColorPicker from '../../components/ColorPicker/ColorPicker';

import ProductMain from '../../assets/images/product/product1-main.png';
import ProductCollar from '../../assets/images/product/product1-collar.png';

var colors = [ '#ccc', '#eee', '#ccc', '#ccc', '#eee' ];

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

class Designer extends React.Component {
	state = {
		image: null,
		output: '',
		colors: {
			mainColor: {
				displayColorPicker: false,
				color: '#ccc'
			},
			secondColor: {
				displayColorPicker: false,
				color: '#000'
			},
			thirdColor: {
				displayColorPicker: false,
				color: '#36548D'
			},
			fourthColor: {
				displayColorPicker: false,
				color: '#2B324A'
			},
			collarColor: {
				displayColorPicker: false,
				color: '#BD2130'
			},
			beltColor: {
				displayColorPicker: false,
				color: '#BD2130'
			}
		}
	};

	componentDidMount() {
		// Make a New Canvas
		this.__canvas = new fabric.Canvas('meCanvas', {
			preserveObjectStacking: true
		});
		this.__canvas.on({
			'object:selected': this.onSelectTextElement
		});

		setTimeout(() => {
			this.setState({ image: this.props.location.state.image });
		}, 1000);

		// this.addNewImageElement(this.props.location.state.image);
	}

	addText() {
		console.log('addText');
		let newID = new Date().getTime().toString().substr(5);
		let text = new fabric.IText('текст', {
			fontFamily: 'arial black',
			left: 100,
			top: 100,
			myid: newID,
			objecttype: 'text'
		});
		// text.setControlsVisibility(this.state.controls);

		this.__canvas.add(text);
		this.__canvas.setActiveObject(text);
		//this.addLayer(newID, 'text');
	}

	delText = () => {
		const activeObject = this.__canvas.getActiveObject();
		if (activeObject) return this.__canvas.remove(activeObject);
		return null;
	};

	addNewImageElement(product) {
		fabric.util.loadImage(product, (img) => {
			const legimg = new fabric.Image(img, {
				left: 0,
				top: 0,
				width: 600,
				height: 600,
				lockUniScaling: true,
				lockMovementX: true,
				lockMovementY: true
			});
			console.log(legimg);
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
			this.setState((prevState) => ({
				...prevState,
				colors: {
					...prevState.colors,
					[key]: {
						...prevState.colors.key,
						color: code,
						displayColorPicker: true
					}
				}
			}));
		} else {
			this.setState((prevState) => ({
				...prevState,
				colors: {
					...prevState.colors,
					[key]: {
						...prevState.colors.key,
						color: prevState.colors[key].color,
						displayColorPicker: colorPicker
					}
				}
			}));
		}
	};

	render() {
		return (
			<section className="container  mt-5 configurator-container">
				<div className="header bg-danger">
					<h1 className="text-center text-white" id="title">
						SPEEDSY
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
							className="canvas"
							height={580}
							id="meCanvas"
							ref="myFabric"
							style={{ zIndex: 999 }}
							onClick={(e) => this.handleCanvasClick(e)}
						/>
						<div className="col-12 product " id="overlay">
							<div className="row mt-3 ">
								<div className="col-11 mx-auto ">
									<img
										className="img-fluid "
										src={ProductMain}
										style={{
											marginLeft: '-12rem',
											width: '400px',
											backgroundImage: ProductMain,
											position: 'absolute',
											filter: `opacity(.8) drop-shadow(0 0 0 ${this.state.colors.mainColor
												.color})`
										}}
										alt="product"
									/>
									<img
										className="img-fluid"
										src={ProductCollar}
										style={{
											marginLeft: '-12rem',
											width: '400px',
											backgroundImage: ProductCollar,
											position: 'absolute',
											filter: `opacity(.8) drop-shadow(0 0 0 ${this.state.colors.collarColor
												.color})`
										}}
										alt="product"
									/>
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
								<span>
									<i className="mt-4 fas fa-palette fa-2x" />
									Color
								</span>
								<span onClick={() => this.addText()}>
									<i className="mt-4 fas fa-font fa-2x" />
									Text
								</span>
								<span>
									<i className="mt-4 fas fa-image fa-2x" />
									Logo
								</span>
							</div>
							<div className="col-9 ml-1 controls-panel border">
								<div className="col-12 mt-3 mb-2">
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

											<span >Belt Color</span>
										</div>
									</div>
									{/* <TwitterPicker
										triangle="top-left"
										colors={colors}
										onSwatchHover={this.handleChangeComplete}
									/> */}
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

export default Designer;
