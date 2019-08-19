import React from "react";
import { connect } from "react-redux";
import "./FontSelector.css";
// import { fabric } from "fabric";
//import FontPicker from "font-picker";

import {
  addText,
  changeColor,
  changeoutlineColor,
  fontStyle,
  fontSize
} from "../../store/actions/index";

import $ from "jquery";
import ColorPicker from "../ColorPicker/ColorPicker";

const fontStyles = [
  "Arial",
  "Courier",
  "Courier New",
  "Bookman Old Style",
  "Century Gothic",
  "Times New Roman",
  "Times New Roman italicized",
  "Modern",
  "Open Sans"
];

class FontSelector extends React.Component {
  state = {
    showModal: false,
    loading: false,
    input: "",
    activeFontFamily: "Open Sans",
    displayColorPicker: false,
    displayOutlineColorPicker: false,
    color: "#eee",
    outlineColor: "#fff",
    font: "Open Sans"
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  inputHandler = event => {
    this.setState({ input: event.target.value });
  };

  insertHandler = () => {
    this.setState({ loading: true });
    this.props.addText(this.state.input);
    this.props.changeFont(this.state.font);
    setTimeout(() => {
      this.props.insert();
      this.setState({ loading: false, showModal: false });
      // $("#inputModal").modal("hide");
    }, 100);
  };

  show = () => {
    this.setState({ show: true });
  };

  handleChangeComplete = (event, type) => {
    if (type === "outline") {
      this.setState({ outlineColor: event.hex });
      this.props.changeOutlineColor(event.hex);
      return;
    } else {
      this.setState({ color: event.hex });
      this.props.changeColor(event.hex);
    }
  };

  handleDisplayColorClick = type => {
    if (type === "outline") this.setState({ displayOutlineColorPicker: true });
    else this.setState({ displayColorPicker: true });
  };

  handleDisplayColorClose = type => {
    if (type === "outline") this.setState({ displayOutlineColorPicker: false });
    else this.setState({ displayColorPicker: false });
  };

  setFontStyle = e => {
    this.setState({ font: e.target.value });
  };

  changeFontSizeHandler = type => {
    let size = this.props.fontSize;
    if (type === "inc") {
      this.props.changeFontSize(size + 1);
    } else {
      this.props.changeFontSize(size - 1);
    }
  };

  render() {
    return (
      this.props.show && (
        <div>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter text here"
              onChange={this.inputHandler}
            />

            <div className="row">
              <div className="col-md-6 font-selector-el">
                <span className="float-left">Font</span>
              </div>
              <div className="col-md-6 font-selector-el">
                <select
                  defaultValue={"DEFAULT"}
                  className="custom-select custom-select-sm mb-3"
                  onChange={this.setFontStyle}
                >
                  <option disabled value="DEFAULT">
                    Choose
                  </option>
                  {fontStyles.map((font, i) => (
                    <option value={font} key={i}>
                      {font}
                    </option>
                  ))}
                </select>

                {/*/>*/}
                {/*<FontPicker*/}
                {/*  id="font-picker"*/}
                {/*  apiKey="AIzaSyBAJWzPR4-xgWPorqSzWqPCSReWht9733Q"*/}
                {/*  activeFontFamily={this.state.activeFontFamily}*/}
                {/*  onChange={nextFont =>*/}
                {/*    this.setState({*/}
                {/*      activeFontFamily: nextFont.family*/}
                {/*    })*/}
                {/*  }*/}
                {/*/>*/}
                {/*<p className="apply-font">The font will be applied to this text.</p>*/}
              </div>
              <div className="col-md-6 font-selector-el">
                <span className="float-left">Font color</span>
              </div>
              <div className="col-md-6 font-selector-el">
                <div
                  style={{
                    width: "6rem",
                    height: "2rem",
                    cursor: "pointer",
                    backgroundColor: this.state.color
                  }}
                  onClick={this.handleDisplayColorClick}
                />
                {this.state.displayColorPicker && (
                  <ColorPicker
                    font
                    handleDisplayColorClose={this.handleDisplayColorClose}
                    handleChangeComplete={e =>
                      this.handleChangeComplete(e, "color")
                    }
                  />
                )}
              </div>
              <div className="col-md-6 font-selector-el">
                <span className="float-left">Outline color</span>
              </div>
              <div className="col-md-6 font-selector-el">
                <div
                  style={{
                    width: "6rem",
                    height: "2rem",
                    cursor: "pointer",
                    backgroundColor: this.state.outlineColor
                  }}
                  onClick={() => this.handleDisplayColorClick("outline")}
                />
                {this.state.displayOutlineColorPicker && (
                  <ColorPicker
                    font
                    handleDisplayColorClose={() =>
                      this.handleDisplayColorClose("outline")
                    }
                    handleChangeComplete={e =>
                      this.handleChangeComplete(e, "outline")
                    }
                  />
                )}
              </div>
              {/*<div className="col-md-6 font-selector-el">*/}
              {/*  <h6 className="text-left">Font size</h6>*/}
              {/*</div>*/}
              {/*<div className="col-md-6 font-selector-el">*/}
              {/*  <button*/}
              {/*    className="btn bg-transparent border mr-1"*/}
              {/*    onClick={this.props.incFontSize}*/}
              {/*  >*/}
              {/*    -*/}
              {/*  </button>*/}
              {/*  <button*/}
              {/*    className="btn bg-transparent border ml-1"*/}
              {/*    onClick={() => this.changeFontSizeHandler("inc")}*/}
              {/*  >*/}
              {/*    +*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
            <button
              className="btn btn-danger mt-5"
              data-toggle="modal"
              data-target="#inputModal"
              onClick={this.insertHandler}
            >
              Add text
            </button>
          </div>

          {/*Modal*/}

          {/*<div*/}
          {/*  className="modal fade"*/}
          {/*  id="inputModal"*/}
          {/*  tabIndex="-1"*/}
          {/*  role="dialog"*/}
          {/*  aria-labelledby="inputModalLabel"*/}
          {/*  aria-hidden="true"*/}
          {/*>*/}
          {/*  <div className="modal-dialog" role="document">*/}
          {/*    <div className="modal-content">*/}
          {/*      <div className="modal-header">*/}
          {/*        <h5 className="modal-title" id="inputModalLabel">*/}
          {/*          Text. Name. Numbers*/}
          {/*        </h5>*/}
          {/*        <button*/}
          {/*          type="button"*/}
          {/*          className="close"*/}
          {/*          data-dismiss="modal"*/}
          {/*          aria-label="Close"*/}
          {/*        >*/}
          {/*          <span aria-hidden="true">&times;</span>*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*      <div className="modal-body">*/}
          {/*        <input*/}
          {/*          type="text"*/}
          {/*          className="form-control"*/}
          {/*          placeholder="Enter text, name, number here"*/}
          {/*          onChange={this.inputHandler}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="modal-footer">*/}
          {/*        <button*/}
          {/*          type="button"*/}
          {/*          className="btn btn-secondary"*/}
          {/*          data-dismiss="modal"*/}
          {/*        >*/}
          {/*          Close*/}
          {/*        </button>*/}
          {/*        <button*/}
          {/*          type="button "*/}
          {/*          className={*/}
          {/*            this.state.loading*/}
          {/*              ? "btn btn-danger disabled"*/}
          {/*              : "btn btn-danger"*/}
          {/*          }*/}
          {/*          onClick={this.insertHandler}*/}
          {/*        >*/}
          {/*          Insert*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    show: state.designerReducer.fontSelector,
    fontSize: state.fontSelectorReducer.size
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addText: text => dispatch(addText(text)),
    changeColor: code => dispatch(changeColor(code)),
    changeOutlineColor: code => dispatch(changeoutlineColor(code)),
    changeFont: style => dispatch(fontStyle(style)),
    changeFontSize: size => dispatch(fontSize(size))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontSelector);
