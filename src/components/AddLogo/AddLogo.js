import React from "react";
import "./AddLogo.css";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class AddLogo extends React.Component {
  state = {
    imgs: []
  };

  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef(this);
  }

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  onChangeFile = event => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        const imgs = this.state.imgs;
        imgs.push(e.target.result);
        this.props.addLogo(e.target.result);
        this.setState({ imgs: imgs });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  addLogoToCanvas = img => {
    this.props.addLogoToCanvas(img);
  };

  render() {
    return (
      <div>
        <div className="row ">
          <div
            className="col-3 border mr-1"
            style={{ height: "4rem", cursor: "pointer" }}
            onClick={this.showOpenFileDlg}
          >
            <i className="fas fa-plus mt-4" />
            <input
              ref={this.inputOpenFileRef}
              type="file"
              style={{ display: "none" }}
              onChange={this.onChangeFile}
            />
          </div>
          {this.props.logoImgs.length === 0 && (
            <p className="mt-5">
              There are no saved logos here. Click on plus to add a logo.
            </p>
          )}
          {this.props.logoImgs.map((img, i) => (
            <div
              className="col-3 p-0 no-gutters border"
              key={i}
              style={{ height: "4rem" }}
              data-toggle="tooltip"
              data-placement="top"
              title="To place a logo, simply click on +"
            >
              <img
                className="img-fluid"
                style={{ width: "100%", height: "70%" }}
                src={img}
                alt="thumbnail"
              />
              <span
                className="float-left ml-1"
                style={{ cursor: "pointer" }}
                onClick={() => this.addLogoToCanvas(img)}
              >
                <i className="fas fa-plus-square" />
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logoImgs: state.addLogoReducer.imgs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLogo: img => dispatch(actions.addLogo(img))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddLogo);
