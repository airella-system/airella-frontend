import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaCube, FaRegLifeRing, FaUser } from "react-icons/fa";
import Button from "./Button";
import "../style/components/menu.scss";
import "../style/additional/animationLib.scss";
import { setLoginDialogVisibility } from "../redux/actions";
import { connect } from "react-redux";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isFirst: true,
    };
  }

  render() {
    let noneClass = this.state.isFirst ? "none " : "";

    return (
      <div className="menuContainter">
        <Link className="link map" to="/">
          <Button isPushed={true}>
            <div className="holder">
              <div>
                <FaMapMarkedAlt className="menuIcon" />
              </div>
              <div className="textAligner">Map</div>
            </div>
          </Button>
        </Link>
        <Link className="link account" to={this.props.logged ? "/account" : ""}>
          <Button
            onClick={() => {
              if (!this.props.logged)
                this.props.dispatch(setLoginDialogVisibility(true))
            }}
          >
            <div className="holder">
              <div>
                <FaUser className="menuIcon" />
              </div>
              <div className="textAligner">{this.props.logged ? "Account" : "Log in"}</div>
            </div>
          </Button>
        </Link>
        <Link className="link about" to="/test">
          <Button>
            <div className="holder">
              <div>
                <FaCube className="menuIcon" />
              </div>
              <div className="textAligner">About project</div>
            </div>
          </Button>
        </Link>
        <a className="link docs" href={process.env.REACT_APP_AIRELLA_DOMAIN + "/api/docs"}>
          <Button>
            <div className="holder">
              <div>
                <FaRegLifeRing className="menuIcon" />
              </div>
              <div className="textAligner">API Docs</div>
            </div>
          </Button>
        </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    logged: state.authorization.logged,
  };
}


export default connect(mapStateToProps)(Menu);
