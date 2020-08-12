import React from "react";
import { Link } from "react-scroll";
import "../../../style/subpage/components/SideBar.scss";

const SideBar = () => {
  const makeLink = (to) => {
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
        {"\u2601"}
      </Link>
    );
  };

  return (
    <div className="sideBar">
      <ul className="itemList">
        <li className="nav-item">{makeLink("section1")}</li>
        <li className="nav-item">{makeLink("section2")}</li>
      </ul>
    </div>
  );
};

export default SideBar;
