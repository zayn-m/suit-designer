import React from "react";
import "./SideThumbnail.css";

class SideThumbnail extends React.Component {
  render() {
    let side = null;

    side = (
      <div>
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter:
              this.props.color.mainColor.selectedColor === ""
                ? this.props.color.mainColor.startingColor
                : this.props.color.mainColor.selectedColor
          }}
          src={this.props.side.main}
          alt=""
        />
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter:
              this.props.color.secondColor.selectedColor === ""
                ? this.props.color.secondColor.startingColor
                : this.props.color.secondColor.selectedColor
          }}
          src={this.props.side.second}
          alt=""
        />
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter:
              this.props.color.thirdColor.selectedColor === ""
                ? this.props.color.thirdColor.startingColor
                : this.props.color.thirdColor.selectedColor
          }}
          src={this.props.side.third}
          alt=""
        />
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter:
              this.props.color.fourthColor.selectedColor === ""
                ? this.props.color.fourthColor.startingColor
                : this.props.color.fourthColor.selectedColor
          }}
          src={this.props.side.fourth}
          alt=""
        />
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter: this.props.color.collarColor.selectedColor
          }}
          src={this.props.side.collar}
          alt=""
        />

        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute",
            filter: this.props.color.beltColor.selectedColor
          }}
          src={this.props.side.belt}
          alt=""
        />
        <img
          className="img-fluid thumb-image"
          style={{
            width: "50%",
            height: "95%",
            left: 15,
            top: 2,
            position: "absolute"
          }}
          src={this.props.side.texture}
          alt=""
        />
      </div>
    );

    return <div> {side} </div>;
  }
}

export default SideThumbnail;
