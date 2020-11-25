import React from "react";
import { Link } from "react-scroll";
import Menu from "../../../components/Menu";
import "../../../style/subpage/components/NavBar.scss";

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
        duration={400}
      >
        {name}
      </Link>
    );
  };

  return (
    <div className="stickyNavBar">
      <div className="navBar">
        <div className="content">
          <Menu canBeHorizontal={true} current="about"/>
          {/* <ul className="itemList">
            <li className="nav-item">{makeLink("section2", "Section2")}</li>
            <li className="nav-item">{makeLink("contact", "Contact")}</li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
