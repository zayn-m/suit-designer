import React from "react";
import "./Products.css";
import { fabric } from "fabric";
// import { CirclePicker } from 'react-color';
//import Img1 from '../../assets/images/product/1.png';
import Shirt1 from "../../assets/images/avail-products/1.jpg";
import Shirt2 from "../../assets/images/avail-products/2.jpg";
import Shirt3 from "../../assets/images/avail-products/3.jpg";
//import Shirt4 from '../../assets/images/avail-products/4.jpg';
// import Img2 from '../../assets/images/product/2.png';
// import Img3 from '../../assets/images/product/3.png';
// import Img4 from '../../assets/images/product/4.png';
// import Img5 from '../../assets/images/product/5.png';
// import Product from '../../assets/images/product/6.png';
import thumbfront from "../../assets/images/product/product-1/front/thumbnail.png";
import mf1 from "../../assets/images/product/product-1/front/suit-base.png";
import sf1 from "../../assets/images/product/product-1/front/strip1.png";
import tf1 from "../../assets/images/product/product-1/front/strip2.png";
import ff1 from "../../assets/images/product/product-1/front/knees.png";
import cf1 from "../../assets/images/product/product-1/front/collar.png";
import bf1 from "../../assets/images/product/product-1/front/belt.png";
import texture from "../../assets/images/product/product-1/front/texture.png";
import thumbback from "../../assets/images/product/product-1/back/thumbnail.png";
import mb1 from "../../assets/images/product/product-1/back/1.png";
import sb1 from "../../assets/images/product/product-1/back/2.png";
import tb1 from "../../assets/images/product/product-1/back/3.png";
import cb1 from "../../assets/images/product/product-1/back/4.png";
import bb1 from "../../assets/images/product/product-1/back/5.png";
import thumbleft from "../../assets/images/product/product-1/left/thumbnail.png";
import ml1 from "../../assets/images/product/product-1/left/1.png";
import sl1 from "../../assets/images/product/product-1/left/2.png";
import tl1 from "../../assets/images/product/product-1/left/3.png";
import fl1 from "../../assets/images/product/product-1/left/4.png";
import cl1 from "../../assets/images/product/product-1/left/5.png";
import bl1 from "../../assets/images/product/product-1/left/6.png";
import thumbright from "../../assets/images/product/product-1/right/thumbnail.png";
import mr1 from "../../assets/images/product/product-1/right/1.png";
import sr1 from "../../assets/images/product/product-1/right/2.png";
import tr1 from "../../assets/images/product/product-1/right/3.png";
import fr1 from "../../assets/images/product/product-1/right/4.png";
import cr1 from "../../assets/images/product/product-1/right/5.png";
import br1 from "../../assets/images/product/product-1/right/6.png";

import thumbfront2 from "../../assets/images/product/product-2/front/thumbnail.png";
import mf2 from "../../assets/images/product/product-2/front/1.png";
import sf2 from "../../assets/images/product/product-2/front/2.png";
import tf2 from "../../assets/images/product/product-2/front/3.png";
import ff2 from "../../assets/images/product/product-2/front/4.png";
import cf2 from "../../assets/images/product/product-2/front/5.png";
import bf2 from "../../assets/images/product/product-2/front/6.png";
import thumbback2 from "../../assets/images/product/product-2/back/thumbnail.png";
import mb2 from "../../assets/images/product/product-2/back/1.png";
import sb2 from "../../assets/images/product/product-2/back/2.png";
import tb2 from "../../assets/images/product/product-2/back/3.png";
import fb2 from "../../assets/images/product/product-2/back/4.png";
import cb2 from "../../assets/images/product/product-2/back/5.png";
import bb2 from "../../assets/images/product/product-2/back/6.png";

var colors = [];

for (let i = 0; i < 30; i++) {
  var letters = "0123456789ABCDEF";

  // html color code starts with #
  var color = "#"; // generating 6 times as HTML color code consist

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
        title: "Product 1",
        front: {
          thumb: thumbfront,
          main: mf1,
          second: sf1,
          third: tf1,
          fourth: ff1,
          collar: cf1,
          belt: bf1,
          texture: texture
        },
        back: {
          thumb: thumbback,
          main: mb1,
          second: sb1,
          third: tb1,
          collar: cb1,
          belt: bb1
        },
        left: {
          thumb: thumbleft,
          main: ml1,
          second: sl1,
          third: tl1,
          fourth: fl1,
          collar: cl1,
          belt: bl1
        },
        right: {
          thumb: thumbright,
          main: mr1,
          second: sr1,
          third: tr1,
          fourth: fr1,
          collar: cr1,
          belt: br1
        }
      },
      {
        id: 1,
        title: "Product 2",
        front: {
          thumb: thumbfront2,
          main: mf2,
          second: sf2,
          third: tf2,
          fourth: ff2,
          collar: cf2,
          belt: bf2,
          texture: texture
        },
        back: {
          thumb: thumbback2,
          main: mb2,
          second: sb2,
          third: tb2,
          fourth: fb2,
          collar: cb2,
          belt: bb2
        },
        left: {
          thumb: thumbleft,
          main: ml1,
          second: sl1,
          third: tl1,
          fourth: fl1,
          collar: cl1,
          belt: bl1
        },
        right: {
          thumb: thumbright,
          main: mr1,
          second: sr1,
          third: tr1,
          fourth: fr1,
          collar: cr1,
          belt: br1
        }
      }
      //   id: 0,
      //   title: "Product 1",
      //   slug: "product-1",
      //   image: Shirt1
      // },
      // {
      //   id: 1,
      //   title: "Product 2",
      //   slug: "product-2",
      //   image: Shirt2
      // },
      // {
      //   id: 2,
      //   title: "Product 3",
      //   slug: "product-3",
      //   image: Shirt3
      // },
      // {
      //   id: 3,
      //   title: "Product 4",
      //   slug: "product-4",
      //   image: Shirt2
      // }
    ],
    output: "",
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
    this.__canvas = new fabric.Canvas("meCanvas", {
      preserveObjectStacking: true,
      height: 812,
      width: 1200,
      backgroundColor: "gray"
    });
    this.__canvas.on({
      "object:selected": this.onSelectTextElement
    });

    let rect = new fabric.Rect({
      left: 100,
      top: 150,
      fill: "red",
      width: 200,
      height: 200
    });

    this.__canvas.add(rect);
  }

  selectProductHandler = product => {
    console.log(product);
    // this.setState({ selectedProduct: product, step: 1 });
    this.props.history.push({
      pathname: "/customize",
      state: {
        product: product
      }
    });
  };

  render() {
    return (
      <section className="container  mt-5 configurator-container">
        <div className="header bg-danger">
          <h1 className="text-center text-white" id="title">
            Product Configurator
          </h1>
          <span className="text-center text-white">R A C E W E A R</span>
        </div>

        <div className="row product-container">
          <div className="col-12 ">
            <h4 className="mt-5">Choose your Design</h4>
            <div className="row products">
              {this.state.products.map(product => (
                <div
                  className="col-3 product-item mx-auto"
                  style={{ height: "30rem" }}
                >
                  <img
                    src={product.front.thumb}
                    style={{ width: "100%", height: "100%" }}
                    className="img-fluid"
                    alt="shirt"
                    onClick={() => this.selectProductHandler(product)}
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
