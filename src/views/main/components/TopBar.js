import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaSearch } from "react-icons/fa";
import '../../../style/main/components/TopBar.scss';
import Menu from '../../../components/Menu';
import PropTypes from 'prop-types';

class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchFocus: false
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
					<div style={{ float: 'left' }}>
						<Menu />
					</div>
					{/* logo placeholder */}
					<span className="logo">Airella</span>
				</div>
				<div className="searchArea" ref={this.setSearchAreaRef} >
					<div className="inputHolder">
						<input className="mainSearch" type="text"
							value={this.state.searchText}
							onChange={this.handleSearchTextChange}
							onFocus={this.handleSearchFocusOn} />
						<div className="searchBtn"><FaSearch className="btnSearchIcon" /></div>
					</div>

					{this.state.searchFocus && this.state.searchData && this.getAutoCompleteList()}
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