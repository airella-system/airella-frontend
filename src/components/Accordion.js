import React, { Component } from "react";
import { connect } from "react-redux";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Menu from "./Menu";
import Button from "./Button";
import { setMapPositionRequest } from "../redux/actions";

import styles from "../style/components/Accordion.module.scss";

class Accordion extends Component {
  constructor(props) {
    super();
    this.state = {
      searchText: "",
      searchFocus: false,
      isOpen: false,
      searchingsExecutingNow: 0,
    };
    this.content = React.createRef();
    this.contentFrame = React.createRef();
  }

  componentDidMount() {
    this.contentFrame.current.style.height = '0px';
  }

  componentDidUpdate() {
    if (this.props.open) {
      setInterval(() => console.log(this.content.current.offsetHeight ), 100);
      this.contentFrame.current.style.height = this.content.current.offsetHeight + 'px';
    } else {
      this.contentFrame.current.style.height = '0px';
    }
  }

  render() {
    let iconSize = 22;
    let icon = this.props.open ? (
      <FaTimes size={iconSize} rotate={45} />
    ) : (
      <FaBars size={iconSize} />
    );

    return (
      <div className={styles.topBar}>
        <div className={styles.menuLeftItems}>
          <div className={styles.topItems}>
            <div className={styles.button}>
              <Button
                onClick={() => this.props.onClick()}
              >
                {icon}
              </Button>
            </div>
            {this.props.titleComponent}
          </div>
          <div ref={this.contentFrame}
            className={`${styles.bottomItems} ${
              this.props.open ? styles.bottomItemsOpen : ""
            }`}
          >
            <div ref={this.content}>
              <div ref={(elem) => { if (elem != null) { console.log("COMPONENTO " + elem.offsetHeight); }}}>
              {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.accountContainer}></div>
      </div>
    );
  }
}

export default Accordion;
