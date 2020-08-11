import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaCube,
  FaRegTimesCircle,
  FaRegLifeRing,
  FaDivide,
} from "react-icons/fa";
import "../style/additional/animationLib.scss";
import "../style/components/button.scss";
import VersionInfo from "./VersionInfo";

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="buttonContainer" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Button;
