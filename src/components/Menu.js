import React from 'react';
import { Link } from "react-router-dom";
import { FaMapMarkedAlt, FaCube, FaRegLifeRing, FaUser } from "react-icons/fa";
import '../style/additional/animationLib.scss';
import '../style/components/menu.scss';
import VersionInfo from './VersionInfo';
import Button from '../components/Button'

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
					<div className="holder holder-active">
						<div><FaMapMarkedAlt className="menuIcon" /></div>
						<div className="textAligner">Map</div>
					</div>
				</Link>
				<Link className="link account" to="/account">
					<div className="holder holder-nonactive">
						<div><FaUser className="menuIcon" /></div>
						<div className="textAligner">Account</div>
					</div>
				</Link>
				<Link className="link about" to="/test">
					<div className="holder holder-nonactive">
						<div><FaCube className="menuIcon" /></div>
						<div className="textAligner">About project</div>
					</div>
				</Link>
				<a className="link docs" href="//airella.cyfrogen.com/api/docs">
					<div className="holder holder-nonactive">
						<div><FaRegLifeRing className="menuIcon" /></div>
						<div className="textAligner">API Docs</div>
					</div>
				</a>
			</div>
		);
	}
}

export default Menu;