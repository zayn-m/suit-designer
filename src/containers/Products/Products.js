import React from 'react';
import './Products.css';
import { fabric } from 'fabric';
import { CirclePicker } from 'react-color';
//import Img1 from '../../assets/images/product/1.png';
import Shirt1 from '../../assets/images/avail-products/1.jpg';
import Shirt2 from '../../assets/images/avail-products/2.jpg';
import Shirt3 from '../../assets/images/avail-products/3.jpg';
//import Shirt4 from '../../assets/images/avail-products/4.jpg';
// import Img2 from '../../assets/images/product/2.png';
// import Img3 from '../../assets/images/product/3.png';
// import Img4 from '../../assets/images/product/4.png';
// import Img5 from '../../assets/images/product/5.png';
import Product from '../../assets/images/product/6.png';

var colors = [];

for (let i = 0; i < 30; i++) {
	var letters = '0123456789ABCDEF';

	// html color code starts with #
	var color = '#'; // generating 6 times as HTML color code consist

	// of 6 letter or digits
	for (let j = 0; j < 6; j++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	colors.push(color);
}

class Designer extends React.Component {
	state = {
		products: [
			{
				id: 0,
				title: 'Product 1',
				slug: 'product-1',
				image: Shirt1
			},
			{
				id: 1,
				title: 'Product 2',
				slug: 'product-2',
				image: Shirt2
			},
			{
				id: 2,
				title: 'Product 3',
				slug: 'product-3',
				image: Shirt3
			},
			{
				id: 3,
				title: 'Product 4',
				slug: 'product-4',
				image: Shirt2
			}
		],
		output: '',
		controls: {
			tl: true, //top left corner is visible
			tr: false,
			bl: false,
			br: false,
			ml: false,
			mt: false,
			mr: false,
			mb: false,
			mtr: false
		},

		selectedProduct: null
	};

	componentDidMount() {
		// Make a New Canvas
		this.__canvas = new fabric.Canvas('meCanvas', {
			preserveObjectStacking: true,
			height: 812,
			width: 1200,
			backgroundColor: 'gray'
		});
		this.__canvas.on({
			'object:selected': this.onSelectTextElement
		});

		let rect = new fabric.Rect({
			left: 100,
			top: 150,
			fill: 'red',
			width: 200,
			height: 200
		});

		this.__canvas.add(rect);
	}

	selectProductHandler = (title, slug, image) => {
		// this.setState({ selectedProduct: product, step: 1 });
		this.props.history.push({
			pathname: '/customize',
			state: {
				title: title,
				slug: slug,
				image: image
			}
		});
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

				<div className="row product-container">
					<div className="col-12 ">
						<h4 className="mt-5">Choose your Product</h4>
						<div className="row products">
							{this.state.products.map((product) => (
								<div className="col-3 product-item">
									<img
										src={product.image}
										className="img-fluid"
										alt="shirt"
										onClick={() =>
											this.selectProductHandler(product.title, product.slug, product.image)}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Designer;
