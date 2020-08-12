import React, { Component } from "react";
import NavBar from "./components/NavBar";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import BottomPanel from "./components/BottomPanel";
import SideBar from "./components/SideBar";

class SubpageView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <SideBar />
        <NavBar />
        <Section1 />
        <Section2 />
        <BottomPanel />
      </div>
    );
  }
}

export default SubpageView;
