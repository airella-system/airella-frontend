import React from "react";
import "../style/additional/animationLib.scss";
import styles from "../style/components/input.module.scss";

class Input extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		searchText: "",
		searchFocus: false
	  };
  }

  handleSearchTextChange = (event) => {
    var text = event.target.value;
    this.setState({ searchText: text });
  };

  handleSearchFocusOn = (event) => {
    this.setState({ searchFocus: true });
  };

  render() {
    return (
      <div className={styles.inputHolder}>
        <div className={styles.mainSearch}>
          <input
            className={styles.mainInput}
            type={this.props.type || "text"}
            placeholder={this.props.placeholder}
            value={this.state.searchText}
            onChange={this.handleSearchTextChange}
            onFocus={this.handleSearchFocusOn}
          />
        </div>
      </div>
    );
  }
}

export default Input;
