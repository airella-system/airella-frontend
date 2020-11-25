import React, { Component } from "react";
import styles from  "../../../style/subpage/components/BottomPanel.module.scss";

class BottomPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.contact} id="contact">
        <a href="https://github.com/airella-system">GitHub</a>
      </div>
    );
  }
}

export default BottomPanel;
