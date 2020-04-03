import React from 'react';
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import '../style/additional/animationLib.scss';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return(
			// <div className="animated infinite slideInLeft delay-2s">
			<div className="menuContainter">
				<div className="hamburger">menu</div>
				<div className="menuHolder">
					<div className="close">close</div>
					<Link className="link" to="/test">
						<div className="holder">
							<div><FaAngleLeft className="menuIcon" /></div>
							<div className="textAligner">test</div>
						</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default Menu;