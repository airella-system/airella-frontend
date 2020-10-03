import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";
import Menu from "../../../components/Menu";
import Button from "../../../components/Button";
import PropTypes from "prop-types";
import { setMapPositionRequest } from "../../../redux/actions";
import { fetchWithAuthorization } from "../../../config/ApiCalls"
import "../../../style/main/components/TopBar.scss";

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchFocus: false,
      isOpen: false,
      searchingsExecutingNow: 0,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  fetchSearch = () => {
    if (this.state.searchText.length >= 3) {
      this.setState({
        searchingsExecutingNow: this.state.searchingsExecutingNow + 1,
      });
      fetchWithAuthorization("http://photon.komoot.de/api/?q=" + this.state.searchText)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            searchData: data,
          })
        )
        .finally((data) =>
          this.setState({
            searchingsExecutingNow: this.state.searchingsExecutingNow - 1,
          })
        );
    } else {
      this.setState({ searchData: null });
    }
  };

  handleSearchTextChange = (event) => {
    var text = event.target.value;
    this.setState({ searchText: text });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText != this.state.searchText) {
      clearTimeout(this.fetchTimeout);
      this.fetchTimeout = setTimeout(() => {
        this.fetchSearch();
      }, 500);
    }
  }

  handleSearchFocusOn = (event) => {
    this.setState({ searchFocus: true });
  };

  handleSuggestionClick = (feature) => {
    let location = [
      feature.geometry.coordinates[1],
      feature.geometry.coordinates[0],
    ];
    this.props.dispatch(setMapPositionRequest(location));

    this.setState({
      searchFocus: false,
      searchText: feature.properties.name,
    });
  };

  handleClickOutside = (event) => {
    if (this.searchAreaRef && !this.searchAreaRef.contains(event.target)) {
      this.setState({ searchFocus: false });
    }
  };

  setSearchAreaRef = (node) => {
    this.searchAreaRef = node;
  };

  getAutoCompleteList = () => {
    if (!this.state.searchData) {
      return <ol className="autoCompleteBox autoCompleteBoxHidden"></ol>;
    }

    const features = this.state.searchData.features;
    const newFeaturesSize = Math.min(8, features.length);
    const limitedFeatures = features.slice(0, newFeaturesSize);
    const listItems = limitedFeatures.map((feature, index) => (
      <li key={index} onClick={() => this.handleSuggestionClick(feature)}>
        <span className="suggestionTitle">{feature.properties.name}</span>
        <br></br>
        {feature.properties.country != null &&
          feature.properties.city != null && (
            <span className="suggestionSubtitle">{`${feature.properties.country}, ${feature.properties.city}`}</span>
          )}
      </li>
    ));

    console.log(listItems.length);

    if (listItems.length == 0) {
      listItems.push(
        <li>
          <span className="suggestionTitle">No results</span>
        </li>
      );
    }

    return (
      <ol
        className={`autoCompleteBox ${
          this.state.searchFocus
            ? "autoCompleteBoxVisible"
            : "autoCompleteBoxHidden"
        }`}
      >
        {listItems}
      </ol>
    );
  };

  render() {
    let iconSize = 22;
    let icon = this.state.isOpen ? (
      <FaTimes size={iconSize} rotate={45} />
    ) : (
      <FaBars size={iconSize} />
    );

    return (
      <div className="topBar">
        <div className="menuLeftItems">
          <div className="topItems">
            <Button
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            >
              {icon}
            </Button>
            {/* logo placeholder */}
            <div className="searchArea" ref={this.setSearchAreaRef}>
              <div className="inputHolder">
                <div className="mainSearch">
                  <input
                    className="mainInput"
                    type="text"
                    placeholder="Search..."
                    value={this.state.searchText}
                    onChange={this.handleSearchTextChange}
                    onFocus={this.handleSearchFocusOn}
                  />
                </div>
                <div className="searchBtn">
                  {this.state.searchingsExecutingNow == 0 && (
                    <FaSearch className="btnSearchIcon" />
                  )}
					{this.state.searchingsExecutingNow != 0 && (
                    <div className="btnSearchIcon btnSearchIconLoading" />
                  )}
                </div>
              </div>
              {this.getAutoCompleteList()}
            </div>
          </div>
          <div
            className={`bottomItems ${
              this.state.isOpen ? "bottomItemsOpen" : ""
            }`}
          >
            <Menu />
          </div>
        </div>
        <div className="accountContainer"></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { searchText: state.searchText };
}

export default connect(mapStateToProps)(TopBar);
