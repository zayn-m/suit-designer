import React from "react";
import "./Designer.css";
import { connect } from "react-redux";
import { fabric } from "fabric";
import "fabric-customise-controls";

import * as actions from "../../store/actions/index";

import Layer from "../../components/Layer/Layer";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import FontSelector from "../../components/FontSelector/FontSelector";
import AddLogo from "../../components/AddLogo/AddLogo";
import Suit2 from "../../assets/images/product/suit1.png";
import collar1 from "../../assets/images/product/COLAR 1.png";

import { res } from "./FilterGenerator";

const dataImage = [
  "https://cdn1.iconfinder.com/data/icons/streamline-interface/60/cell-8-10-120.png" /*scale*/,
  "https://cdn1.iconfinder.com/data/icons/ui-color/512/Untitled-12-128.png" /*delete*/,
  "https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/sync-16.png" /*rotate*/,
  "https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/write-compose-16.png" /*change text*/,
  "https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-1/128/save-16.png" /*save*/
];

class Designer extends React.Component {
  state = {
    image: null,
    output: "",
    side: "front",
    colors: {
      mainColor: {
        displayColorPicker: false,
        color: "#000",
        selectedColor: "",
        startingColor:
          "invert(12%) sepia(20%) saturate(25%) hue-rotate(100deg) brightness(96%) contrast(88%)"
      },
      secondColor: {
        displayColorPicker: false,
        color: "#000",
        selectedColor: "",
        startingColor:
          "invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)"
      },
      thirdColor: {
        displayColorPicker: false,
        color: "#36548D",
        selectedColor: "",
        startingColor:
          "invert(12%) sepia(87%) saturate(4411%) hue-rotate(357deg) brightness(91%) contrast(120%)"
      },
      fourthColor: {
        displayColorPicker: false,
        color: "#2B324A",
        selectedColor: "",
        startingColor:
          "invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)"
      },
      collarColor: {
        displayColorPicker: false,
        color: "#BD2130",
        selectedColor: "",
        startingColor:
          "invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)"
      },
      beltColor: {
        displayColorPicker: false,
        color: "#BD2130",
        selectedColor: "",
        startingColor:
          "invert(87%) sepia(0%) saturate(2201%) hue-rotate(38deg) brightness(92%) contrast(91%)"
      }
    },
    mainImg: Suit2,
    collar: collar1,
    activeColor: true,
    activeText: false,
    activeLogo: false,
    font: {
      show: true,
      imgs: {}
    },
    back: false,
    imgs: {}
  };

  componentDidMount() {
    // Make a New Canvas
    this.__canvas = new fabric.Canvas("meCanvas", {
      preserveObjectStacking: true
    });
    this.__canvas.on({
      "object:selected": this.onSelectTextElement
    });
    this.setState({ imgs: this.props.location.state.product.front });
  }

  addText() {
    let newID = new Date()
      .getTime()
      .toString()
      .substr(5);
    let text = new fabric.IText(this.props.insertedText, {
      fontFamily: this.props.fontStyle,
      fontSize: this.props.fontSize,
      left: 100,
      top: 100,
      myid: newID,
      objecttype: "text",
      side: this.state.side
    });
    text.customiseCornerIcons({
      mtr: {
        icon: dataImage[1]
      }
    });
    // text.setControlsVisibility(this.state.controls);
    text.setColor(this.props.fontColor);
    //text.fillStyle = this.props.fontColor;
    text.stroke = this.props.outlineColor;
    text.strokeWidth = 0.7;
    this.__canvas.add(text);
    this.__canvas.setActiveObject(text);
    //this.addLayer(newID, 'text');
  }

  delEl = () => {
    const activeObject = this.__canvas.getActiveObject();
    if (activeObject) return this.__canvas.remove(activeObject);
    return null;
  };

  changeFontSizeHandler = () => {
    const activeObject = this.__canvas.getActiveObject();
    let size = this.props.fontSize;

    this.props.changeFontSize(size + 1);
    activeObject.fontSize = this.props.fontSize;
  };

  addNewImageElement(e) {
    fabric.util.loadImage(e, img => {
      const legimg = new fabric.Image(img, {
        left: 0,
        top: 0,
        lockUniScaling: true,
        side: this.state.side
      });
      legimg.scaleToWidth(80);
      legimg.scaleToHeight(80);

      this.__canvas.add(legimg);
      this.__canvas.bringToFront(legimg);
      this.__canvas.renderAll();
    });
  }

  setCanvasImage(canvasImage) {
    self = this;
    if (canvasImage) {
      this.__canvas.setBackgroundColor(
        { source: canvasImage, repeat: "repeat" },
        function() {
          self.__canvas.renderAll();
        }
      );
    }
  }

  handleCanvasClick = e => {
    console.log("clicked");
    const ne = e.nativeEvent;
    const bb = this.refs.myFabric.getBoundingClientRect();
    const x = Math.round(ne.clientX - bb.left);
    const y = Math.round(ne.clientY - bb.top);
    this.setState({ output: "clicked @ " + x + ", " + y });
  };

  handleChangeComplete = (color, event, layer) => {
    this.updateColorState(layer, color.hex, false);
  };

  handleDisplayColorClick = layer => {
    this.updateColorState(layer, null, true);
  };

  handleDisplayColorClose = layer => {
    this.updateColorState(layer, null, false);
  };

  updateColorState = (key, code, colorPicker) => {
    if (key && code) {
      const r = res(code);
      const filter = r.filter.split(":")[1].split(";")[0];

      this.setState(prevState => ({
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
      this.setState(prevState => ({
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

  changeSideHandler = (product, side) => {
    this.setState({ side: side, imgs: product });

    this.__canvas.getObjects().map(function(o) {
      if (o.side === side) {
        return (o.visible = true);
      } else {
        return (o.visible = false);
      }
    });

    this.__canvas.renderAll();
  };

  render() {
    const front = this.props.location.state.product.front;
    const back = this.props.location.state.product.back;
    const left = this.props.location.state.product.left;
    const right = this.props.location.state.product.right;
    return (
      <section className="container  mt-5 configurator-container">
        <div className="header bg-danger">
          <h1 className="text-center text-white" id="title">
            Product Configurator
          </h1>
          <span className="text-center text-white">R A C E W E A R</span>
        </div>

        <div className="row configurator">
          <div className="col-3 col-md-1 ">
            <div
              className="col-12 preview-box border"
              onClick={() => this.changeSideHandler(front, "front")}
            >
              <img
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
                src={front.thumb}
                alt="front"
              />
            </div>
            <div
              className="col-12 preview-box p-0 border"
              onClick={() => this.changeSideHandler(back, "back")}
            >
              <img
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
                src={back.thumb}
                alt="back"
              />
            </div>
            <div
              className="col-12 preview-box border"
              onClick={() => this.changeSideHandler(left, "left")}
            >
              <img
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
                src={left.thumb}
                alt="left"
              />
            </div>
            <div
              className="col-12 preview-box border"
              onClick={() => this.changeSideHandler(right, "right")}
            >
              <img
                className="img-fluid"
                style={{ width: "100%", height: "100%" }}
                src={right.thumb}
                alt="right"
              />
            </div>
          </div>
          <div id="canvas-wrap" className="col-8 col-md-7 border ">
            <canvas
              className="canvas "
              height={580}
              id="meCanvas"
              ref="myFabric"
              style={{ zIndex: 999 }}
              onClick={e => this.handleCanvasClick(e)}
            />
            <div className="col-12 product " id="overlay">
              <div className="row mt-3 ">
                <div className="col-11 mx-auto ">
                  <Layer
                    img={this.state.imgs.main}
                    selectedColor={this.state.colors.mainColor.selectedColor}
                    startingColor={this.state.colors.mainColor.startingColor}
                  />
                  <Layer
                    img={this.state.imgs.second}
                    selectedColor={this.state.colors.secondColor.selectedColor}
                    startingColor={this.state.colors.secondColor.startingColor}
                  />
                  <Layer
                    img={this.state.imgs.third}
                    selectedColor={this.state.colors.thirdColor.selectedColor}
                    startingColor={this.state.colors.thirdColor.startingColor}
                  />
                  <Layer
                    img={this.state.imgs.fourth}
                    selectedColor={this.state.colors.fourthColor.selectedColor}
                    startingColor={this.state.colors.fourthColor.startingColor}
                  />
                  <Layer
                    img={this.state.imgs.collar}
                    selectedColor={this.state.colors.collarColor.selectedColor}
                    startingColor={this.state.colors.collarColor.startingColor}
                  />
                  <Layer
                    img={this.state.imgs.belt}
                    selectedColor={this.state.colors.beltColor.selectedColor}
                    startingColor={this.state.colors.beltColor.startingColor}
                  />
                  <Layer img={this.state.imgs.texture} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 controls">
            <div className="row">
              <div className="col-2">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={this.props.toggleColorPicker}
                >
                  <i className="mt-4 fas fa-palette fa-2x" />
                  Color
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={this.props.toggleText}
                >
                  <i className="mt-4 fas fa-font fa-2x" />
                  Text
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={this.props.toggleLogo}
                >
                  <i className="mt-4 fas fa-image fa-2x" />
                  Logo
                </span>
                <span style={{ cursor: "pointer" }} onClick={this.delEl}>
                  <i className="mt-4 fas fa-trash fa-2x" />
                  Remove
                </span>
              </div>
              <div className="col-9 ml-3 controls-panel border">
                <div className="col-12 mt-3 mb-2 ">
                  <FontSelector
                    insert={() => this.addText()}
                    incFontSize={this.changeFontSizeHandler}
                  />
                  {this.props.addLogo && (
                    <AddLogo
                      addLogoToCanvas={e => this.addNewImageElement(e)}
                    />
                  )}
                  {this.props.colorPicker && (
                    <div>
                      <div className="row ">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.mainColor.color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("mainColor")
                            }
                          />
                          {this.state.colors.mainColor.displayColorPicker ? (
                            <ColorPicker
                              main
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("mainColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "mainColor"
                                )
                              }
                            />
                          ) : null}
                          <span>Main Color</span>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.secondColor
                                .color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("secondColor")
                            }
                          />
                          {this.state.colors.secondColor.displayColorPicker ? (
                            <ColorPicker
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("secondColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "secondColor"
                                )
                              }
                            />
                          ) : null}
                          <span>Second Color</span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.thirdColor
                                .color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("thirdColor")
                            }
                          />
                          {this.state.colors.thirdColor.displayColorPicker ? (
                            <ColorPicker
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("thirdColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "thirdColor"
                                )
                              }
                            />
                          ) : null}
                          <span>Third Color</span>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.fourthColor
                                .color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("fourthColor")
                            }
                          />
                          {this.state.colors.fourthColor.displayColorPicker ? (
                            <ColorPicker
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("fourthColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "fourthColor"
                                )
                              }
                            />
                          ) : null}

                          <span>Fourth Color</span>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.collarColor
                                .color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("collarColor")
                            }
                          />
                          {this.state.colors.collarColor.displayColorPicker ? (
                            <ColorPicker
                              collar
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("collarColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "collarColor"
                                )
                              }
                            />
                          ) : null}
                          <span>Collar Color</span>
                        </div>
                      </div>
                      <div className="row ">
                        <div className="col-9 mt-2">
                          <div
                            className="controls-panel__color"
                            style={{
                              backgroundColor: this.state.colors.beltColor.color
                            }}
                            onClick={() =>
                              this.handleDisplayColorClick("beltColor")
                            }
                          />
                          {this.state.colors.beltColor.displayColorPicker ? (
                            <ColorPicker
                              handleDisplayColorClose={() =>
                                this.handleDisplayColorClose("beltColor")
                              }
                              handleChangeComplete={(color, event) =>
                                this.handleChangeComplete(
                                  color,
                                  event,
                                  "beltColor"
                                )
                              }
                            />
                          ) : null}

                          <span>Belt Color</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row controls-footer">
              <div className="controls-footer__btn ml-auto">
                <button
                  data-toggle="modal"
                  data-target="#msgModal"
                  className="btn m-3 bg-danger text-white text-bold"
                >
                  Add to Cart
                </button>
                <button
                  data-toggle="modal"
                  data-target="#msgModal"
                  className="btn m-3 bg-danger text-white text-bold"
                >
                  Preview
                </button>
              </div>
            </div>
            <div
              className="modal fade"
              id="msgModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="msgModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="msgModalLabel">
                      Coming Soon
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>
                      This application is in demo version. Selected feature will
                      be added soon.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button "
                      className="btn btn-danger"
                      data-dismiss="modal"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorPicker: state.designerReducer.colorPicker,
    addLogo: state.designerReducer.addLogo,
    insertedText: state.fontSelectorReducer.text,
    fontColor: state.fontSelectorReducer.code,
    outlineColor: state.fontSelectorReducer.outlineColor,
    fontStyle: state.fontSelectorReducer.style,
    fontSize: state.fontSelectorReducer.size
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleColorPicker: () => dispatch(actions.toggleColorPicker()),
    toggleText: () => dispatch(actions.toggleText()),
    changeFontSize: size => dispatch(actions.fontSize(size)),
    toggleLogo: () => dispatch(actions.toggleAddLogo())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Designer);
