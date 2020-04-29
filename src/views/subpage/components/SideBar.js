import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-scroll"
import '../../../style/subpage/components/SideBar.scss'

class SideBar extends Component {

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
			<div className="sideBar">
        <ul className="itemList">
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section1" 
              spy={true}
              smooth={true}
              offset={0}
              duration= {500}
            >Section1</Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section2"
              spy={true}
              smooth={true}
              offset={0}
              duration= {500}
            >Section2</Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="contact"
              spy={true}
              smooth={true}
              offset={0}
              duration= {500}
            >Contact</Link>
          </li>
        </ul>
      </div>
		);
	}
}

function mapStateToProps(state) {
  return state.search;
}

export default connect(mapStateToProps)(SideBar);