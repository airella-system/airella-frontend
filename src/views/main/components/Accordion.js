import React, { Component } from "react";
import { connect } from "react-redux";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Menu from "../../../components/Menu";
import Button from "../../../components/Button";
import { setMapPositionRequest } from "../../../redux/actions";

import styles from "../../../style/main/components/Accordion.module.scss";

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
    if (this.state.isOpen) {
      this.contentFrame.current.style.height = this.content.current.offsetHeight + 'px';
    } else {
      this.contentFrame.current.style.height = '0px';
    }
  }

  render() {
    let iconSize = 22;
    let icon = this.state.isOpen ? (
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
                onClick={() => {this.setState({ isOpen: !this.state.isOpen });
                console.log(this.content.current.offsetHeight)}}
              >
                {icon}
              </Button>
            </div>
            {this.props.titleComponent}
          </div>
          <div ref={this.contentFrame}
            className={`${styles.bottomItems} ${
              this.state.isOpen ? styles.bottomItemsOpen : ""
            }`}
          >
            <div ref={this.content}>
              {this.props.children}
            </div>
          </div>
        </div>
        <div className={styles.accountContainer}></div>
      </div>
    );
  }
}

export default Accordion;
