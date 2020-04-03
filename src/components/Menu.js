import React from 'react';
import { Link } from "react-router-dom";
import { FaAngleLeft, FaRegTimesCircle, FaRegLightbulb } from "react-icons/fa";
import '../style/additional/animationLib.scss';
import '../style/components/menu.scss';

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	render() {
		return(
			// <div className="animated infinite slideInLeft delay-2s">
			<div className="menuContainter">
				<div className="hamburger">
					<div 
						className="" 
						onClick={() => this.setState({ isOpen: true })}
					>menu</div>
					</div>
				<div className={`menuHolder animated ${this.state.isOpen ? "slideInLeft" : "slideOutLeft"}`} >
					<div className="close">
						<FaRegTimesCircle 
							className="closeIcon" 
							onClick={() => this.setState({ isOpen: false })} 
						/>
					</div>

					<Link className="link" to="/test">
						<div className="holder">
							<div><FaRegLightbulb className="menuIcon" /></div>
							<div className="textAligner">test</div>
						</div>
					</Link>
					<Link className="link" to="/test">
						<div className="holder">
							<div><FaRegLightbulb className="menuIcon" /></div>
							<div className="textAligner">test</div>
						</div>
					</Link>
					<Link className="link" to="/test">
						<div className="holder">
							<div><FaRegLightbulb className="menuIcon" /></div>
							<div className="textAligner">test</div>
						</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default Menu;