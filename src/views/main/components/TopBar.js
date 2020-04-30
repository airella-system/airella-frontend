import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSearch } from '../../../redux/actions';
import { FaSearch } from "react-icons/fa";
import '../../../style/main/components/TopBar.scss';
import Menu from '../../../components/Menu';


class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			searchFocus: false
		};
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

	handleSearchFocusOut = (event) => {
		this.setState({ searchFocus: false });
	}

	autoCompleteList = () => {
		const features = this.state.searchData.features;
		const newFeaturesSize = Math.min(8, features.length);
		const limitedFeatures = features.slice(0, newFeaturesSize);
		const listItems = limitedFeatures.map((feature, index) =>
			<li key={index}>
				{feature.properties.name}
			</li>
		)
		return <ol className="autoCompleteBox">
			{listItems}
		</ol>
	}

	render() {
		const { text } = this.props;

		return (
			<div className="topBar">

				<div className="menuHolder">
					<Menu />
				</div>
				<div style={{ position: 'relative', width: '30%' }}>
					<div className="inputHolder">
						<input className="mainSearch" type="text"
							value={this.state.searchText}
							onChange={this.handleSearchTextChange}
							onFocus={this.handleSearchFocusOn}
							onBlur={this.handleSearchFocusOut} />
						<div className="searchBtn"><FaSearch className="btnSearchIcon" /></div>
					</div>
					{this.state.searchFocus && this.state.searchData && this.autoCompleteList()}
				</div>
				<div className="accountContainer"></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state.search;
}

export default connect(mapStateToProps)(TopBar);