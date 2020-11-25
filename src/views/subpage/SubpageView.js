import React, { Component } from "react"
import NavBar from "./components/NavBar"
import Foreground from "./components/Foreground"
import BottomPanel from "./components/BottomPanel"
import styles from "../../style/subpage/SubpageView.module.scss"

class SubpageView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <NavBar />
          <Foreground />
          <BottomPanel />
        </div>
      </div>
    );
  }
}

export default SubpageView;
