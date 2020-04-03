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
			text: "",
		};
	}

	static propTypes = {
    text: PropTypes.string
	}

	render() {
		const { text } = this.props;

		return(
			<div className="topBar">

				<div className="menuHolder">
					<Menu/>
				</div>
				<div className="inputHolder">
					<input className="mainSearch" type="text" />
					<div className="searchBtn"><FaSearch className="btnSearchIcon"/></div>
				</div>
				<div className="accountContainer"></div>

				{/* TopBar - { text } - { this.state.text }
				<input value={this.state.text} onChange={(e) => { this.setState({text: e.target.value}) }}></input>
				<button onClick={() => {this.props.dispatch(setSearch(this.state.text));}}>ok</button> */}
			</div>
		);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(TopBar);