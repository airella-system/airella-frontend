import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaCube, FaRegLifeRing, FaUser } from "react-icons/fa";
import Button from './Button';
import '../style/components/menu.scss';
import '../style/additional/animationLib.scss';
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
							<div><FaMapMarkedAlt className="menuIcon" /></div>
							<div className="textAligner">Map</div>
						</div>
					</Button>
				</Link>
				<div className="link account">
				<Button onClick={() => this.props.dispatch(setLoginDialogVisibility(true))}>
					<div className="holder">
						<div><FaUser className="menuIcon" /></div>
						<div className="textAligner">Account</div>
					</div>
				</Button>
				</div>
				<Link className="link about" to="/test">
					<Button>
						<div className="holder">
							<div><FaCube className="menuIcon" /></div>
							<div className="textAligner">About project</div>
						</div>
					</Button>
				</Link>
				<a className="link docs" href="//airella.cyfrogen.com/api/docs">
					<Button>
						<div className="holder">
							<div><FaRegLifeRing className="menuIcon" /></div>
							<div className="textAligner">API Docs</div>
						</div>
					</Button>
				</a>
			</div>
		);
	}
}

export default connect()(Menu);
