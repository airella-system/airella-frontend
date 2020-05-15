import React from 'react';
import { Link } from "react-scroll"
import '../../../style/subpage/components/NavBar.scss'

const NavBar = () => {
  const makeLink = (to, name) => {
    return (
      <Link
        activeClass="active"
        inactiveClas="inactive"
        to={to}
        spy={true}
        smooth={true}
        offset={0}
        duration= {400}
      >{name}</Link>
    )
  }

  return(
    <div className="navBar">
      <div className="navBarContents">
        <div className="logo">
          <b>Airella</b>
        </div>
        <ul className="itemList">
          <li className="nav-item">
            {makeLink("section1", "Section1")}
          </li>
          <li className="nav-item">
            {makeLink("section2", "Section2")}
          </li>
          <li className="nav-item">
            {makeLink("contact", "Contact")}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar;