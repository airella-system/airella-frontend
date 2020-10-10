import React, { Component } from "react";
import styles from "../../style/pages/user.module.scss";
import { getApiUrl } from "../../config/ApiURL";

import StationAccordion from "../../components/StationAccordion";
import { fetchWithAuthorization } from "../../config/ApiCalls";
import { RiSensorFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";

import Button from "../../components/Button";
import { logout as logoutFunction } from "../../config/ApiCalls";
import { withRouter } from 'react-router-dom'

class UserView extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.fetchStations();
  }

  fetchStations = () => {
    let url = getApiUrl("getUserStations");
    fetchWithAuthorization(url)
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({
            stations: response.data,
          });
        }
      });
  };

  getStationAccordion(station) {
    return (
      <StationAccordion
        key={station.id}
        station={station}
        onStationRemoved={(stationId) => this.fetchStations()}
      ></StationAccordion>
    );
  }

  getStationsAccordion() {
    if (!this.state.stations) return;
    return this.state.stations.map((station) => {
      return this.getStationAccordion(station);
    });
  }

  logout = () => {
    logoutFunction();
    this.props.history.push('/')
  }

  render() {
    return (
      <div className={styles.root}>
        <div className={styles.insideRoot}>
          <div className={styles.header}>Your profile</div>
          <div className={styles.tabs}>
            <div className={styles.insideTabs}>
              <div className={styles.button}>
                <Button isPushed={true}>
                  <div className={styles.holder}>
                    <div>
                      <RiSensorFill className={styles.menuIcon} />
                    </div>
                    <div className={styles.textAligner}>Your stations</div>
                  </div>
                </Button>
              </div>
              <div className={styles.button}>
                <Button onClick={this.logout}>
                  <div className={styles.holder}>
                    <div>
                      <FiLogOut className={styles.menuIcon} />
                    </div>
                    <div className={styles.textAligner}>Logout</div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.card}>{this.getStationsAccordion()}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserView);
