import React from 'react';
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaCube, FaRegTimesCircle, FaRegLifeRing } from "react-icons/fa";
import '../style/additional/animationLib.scss';
import '../style/components/menu.scss';

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

		return(
			<div className="menuContainter">
				<div className="hamburger" onClick={() => this.setState({ isOpen: true, isFirst: false })}>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className={noneClass + `menuHolder faster2 animated ${this.state.isOpen ? "slideInLeft" : "slideOutLeft"}`} >
					<div className="close">
						<FaRegTimesCircle 
							className="closeIcon" 
							onClick={() => this.setState({ isOpen: false })} 
						/>
					</div>
					<Link className="link" to="/test">
						<div className="holder">
							<div><FaMapMarkedAlt className="menuIcon" /></div>
							<div className="textAligner">stona główna</div>
						</div>
					</Link>
					<Link className="link" to="/test">
						<div className="holder">
							<div><FaCube className="menuIcon" /></div>
							<div className="textAligner">o projekcie</div>
						</div>
					</Link>
					<a className="link" href="//airella.cyfrogen.com/api/docs">
						<div className="holder">
							<div><FaRegLifeRing className="menuIcon" /></div>
							<div className="textAligner">api docs</div>
						</div>
					</a>
				</div>
			</div>
		);
	}
}

export default Menu;