import React, { Component } from "react";
import { connect } from "react-redux";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";



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

  animationEndListener = () => {
    this.contentFrame.current.style.height = "auto";
    this.contentFrame.current.removeEventListener(
      "transitionend",
      this.animationEndListener,
      true
    );
  };

  componentDidMount() {
    this.contentFrame.current.style.height = "0px";
  }

  componentDidUpdate(prevProps) {
    if (this.props.open != prevProps.open) {
      if (this.props.open) {
        this.contentFrame.current.classList.add(styles.bottomItemsOpen);

        this.contentFrame.current.style.height =
          this.content.current.offsetHeight + "px";
        this.contentFrame.current.addEventListener(
          "transitionend",
          this.animationEndListener,
          true
        );
      } else {
        this.contentFrame.current.style.height = this.content.current.offsetHeight + 'px';
        setTimeout(() => {
          this.contentFrame.current.classList.remove(styles.bottomItemsOpen);
          this.contentFrame.current.style.height = "0px";
        }, 1);
      }
    }
  }

  render() {
    let iconSize = 22;
    let icon = this.props.open ? (
      <IoIosArrowDown size={iconSize} />
    ) : (
      <IoIosArrowForward size={iconSize} />
    );

    return (
      <div className={styles.topBar}>
        <div className={styles.menuLeftItems}>
          <div className={styles.topItems}>
            <div className={styles.button}>
              <Button onClick={() => this.props.onClick()}>{icon}</Button>
            </div>
            {this.props.titleComponent}
          </div>
          <div ref={this.contentFrame} className={`${styles.bottomItems}`}>
            <div ref={this.content}>{this.props.children}</div>
          </div>
        </div>
        <div className={styles.accountContainer}></div>
      </div>
    );
  }
}

export default Accordion;
