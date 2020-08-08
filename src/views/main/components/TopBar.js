import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { FaSearch, FaHamburger, FaMapMarkedAlt, FaCube, FaRegTimesCircle, FaRegLifeRing, FaDivide, FaBars } from "react-icons/fa";
import Menu from '../../../components/Menu';
import Button from '../../../components/Button'
import PropTypes from 'prop-types';

import '../../../style/main/components/TopBar.scss';

class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchFocus: false,
			isOpen: false
		};
	}

	static propTypes = {
		onLocationChanged: PropTypes.func
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleSearchTextChange = (event) => {
		var text = event.target.value;
		this.setState({ searchText: text });
		if (text.length >= 3) {
			fetch('http://photon.komoot.de/api/?q=' + text)
				.then(response => response.json())
				.then(data => this.setState({ searchData: data }));
		} else {
			this.setState({ searchData: null });
		}
	}

	handleSearchFocusOn = (event) => {
		this.setState({ searchFocus: true });
	}

	handleSuggestionClick = (feature) => {
		if (this.props.onLocationChanged) {
			this.props.onLocationChanged(feature.geometry.coordinates);
		}
		this.setState({ searchFocus: false });
	}

	handleClickOutside = (event) => {
		if (this.searchAreaRef && !this.searchAreaRef.contains(event.target)) {
			this.setState({ searchFocus: false });
		}
	}

	setSearchAreaRef = (node) => {
		this.searchAreaRef = node;
	}

	getAutoCompleteList = () => {
		const features = this.state.searchData.features;
		const newFeaturesSize = Math.min(8, features.length);
		const limitedFeatures = features.slice(0, newFeaturesSize);
		const listItems = limitedFeatures.map((feature, index) =>
			<li key={index} onClick={() => this.handleSuggestionClick(feature)}>
				<span className="suggestionTitle">{feature.properties.name}</span>
				{feature.properties.street != null &&
					<span className="suggestionSubtitle">{feature.properties.name}</span>}
			</li>
		)
		return <ol className="autoCompleteBox">
			{listItems}
		</ol>
	}

	render() {
		return (
			<div className="topBar">
				<div className="menuLeftItems">
					<div className="topItems">
						{/* <Menu onClick={() => {console.log("hehe")}}/> */}
						<Button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
							<FaBars size={22}></FaBars>
						</Button>
						{/* logo placeholder */}
						<div className="searchArea" ref={this.setSearchAreaRef} >
							<div className="inputHolder">
								<div className="mainSearch">
									<input className="mainInput" type="text"
									placeholder="Search..."
										value={this.state.searchText}
										onChange={this.handleSearchTextChange}
										onFocus={this.handleSearchFocusOn} />
								</div>
								<div className="searchBtn"><FaSearch className="btnSearchIcon" /></div>
							</div>
							{this.state.searchFocus && this.state.searchData && this.getAutoCompleteList()}
						</div>
					</div>
					<div className={`bottomItems ${this.state.isOpen ? "bottomItemsOpen" : ""}`}>
						<Link className="link map" to="/">
							<div className="holder holder-active">
								<div><FaMapMarkedAlt className="menuIcon" /></div>
								<div className="textAligner">Map</div>
							</div>
						</Link>
						<Link className="link account" to="/account">
							<div className="holder holder-nonactive">
								<div><FaCube className="menuIcon" /></div>
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
				</div>
				<div className="accountContainer"></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { searchText: state.searchText };
}

export default connect(mapStateToProps)(TopBar);