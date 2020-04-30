import React, { Component } from 'react';
import { Link } from "react-scroll"
import '../../../style/subpage/components/SideBar.scss'

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
		};
	}

	render() {
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

export default SideBar;