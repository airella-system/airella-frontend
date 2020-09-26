import React, { Component } from "react";
import styles from "../../style/pages/user.module.scss";
import { getApiUrl } from "../../config/ApiURL";

import StationAccordion from "../../components/StationAccordion";

import { IconContext } from "react-icons";
import {
  AiOutlineLoading,
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
} from "react-icons/ai";

class UserView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    let url = getApiUrl("getStations"); //todo change
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({
            stations: response.data,
          });
        }
      });
  }

  getStationAccordion(station) {
    return (
      <StationAccordion
        key={station.id}
        station={station}
      >
      </StationAccordion>
    );
  }

  getStationsAccordion() {
    if (!this.state.stations) return;
    return this.state.stations.map((station) => {
      return this.getStationAccordion(station);
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.card}>{this.getStationsAccordion()}</div>
      </div>
    );
  }
}

export default UserView;
