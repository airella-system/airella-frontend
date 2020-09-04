import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sensorDetailAction } from "../../../redux/actions";
import { FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from "../../../mocks/StationDetailApiMock";
import Gauge from "../../../components/Gauge";
import "../../../style/main/components/SensorDetails.scss";
import { ReactComponent as Cloud1 } from "../../../style/main/components/assets/cloud1.svg";
import { ReactComponent as Cloud2 } from "../../../style/main/components/assets/cloud2.svg";
import { ReactComponent as Cloud3 } from "../../../style/main/components/assets/cloud3.svg";
import { ReactComponent as Boy1 } from "../../../style/main/components/assets/boy1.svg";
import { ReactComponent as Smile } from "../../../style/main/components/assets/smile1.svg";

import { AirQualityIcons, indexToLevel } from "../../../config/AirQuality";
import ChartTabs from "./ChartTabs.js";
import Button from "../../../components/Button";
import { getApiUrl } from "../../../config/ApiURL";
import PerfectScrollbar from "react-perfect-scrollbar";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Statistic from "../../../components/Statistic";
import { IoMdThermometer, IoMdSpeedometer } from "react-icons/io";
import { GiWaterDrop } from "react-icons/gi";
import { IoIosSpeedometer } from "react-icons/io";
import { WiSmoke } from "react-icons/wi";

import statisticStyles from "../../../style/components/statistic.module.scss";

class SensorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationDetal: null,
      isFirst: true,
      visible: false,
    };
  }

  static propTypes = {
    sensorData: PropTypes.object,
  };

  loadData() {
    //TODO: send api request
    this.state.stationDetal = stationDetailDataMock;
  }

  getQualityClassColor(airQialityIndex) {
    return "quality_" + indexToLevel(airQialityIndex);
  }

  getAirQualityIcon() {
    return AirQualityIcons[indexToLevel(this.state.stationDetal.airQuality)];
  }

  getLastMeasuremtnTime() {
    let latestData = this.state.latestData;
    if (!latestData) {
      return null;
    }

    let lastTimestamp = latestData.sensors[0].values[0].timestamp;
    let dateTime = new Date(lastTimestamp);
    return dateTime.toLocaleString("en-US");
  }

  getTitle() {
    let latestData = this.state.latestData;
    if (!latestData) {
      return null;
    }
    return (
      this.state.latestData.address.city +
      ", " +
      this.state.latestData.address.street +
      " " +
      this.state.latestData.address.number
    );
  }

  getGauges() {
    let latestData = this.state.latestData;
    if (!latestData) {
      return null;
    }
    let id = this.state.latestData["id"];
    let typeToGaugeGenerator = {
      pm2_5: (sensorData) => (
        <Gauge
          key={id + "PM2.5"}
          name="PM2.5"
          value={sensorData.values[0].value}
          percent={sensorData.status}
          unit="µg/m³"
        ></Gauge>
      ),
      pm10: (sensorData) => (
        <Gauge
          key={id + "PM10"}
          name="PM10"
          value={sensorData.values[0].value}
          percent={sensorData.status}
          unit="µg/m³"
        ></Gauge>
      ),
    };

    let priority = ["pm2_5", "pm10"];

    return priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        (sensor) => sensor["type"] == sensorType
      );
      if (sensors.length >= 1 && sensors[0].values) {
        return typeToGaugeGenerator[sensorType](sensors[0]);
      }
    });
  }

  getPollutionStatistics() {
    let latestData = this.state.latestData;
    if (!latestData) {
      return null;
    }
    let id = this.state.latestData["id"];
    let typeToGaugeGenerator = {
      pm1: (sensorData) => (
        <Statistic
          pollution={true}
          key={id + "PM1"}
          name="PM1"
          value={sensorData.values[0].value}
          unit="µg/m³"
          icon={<WiSmoke className={statisticStyles.leftIcon} />}
        ></Statistic>
      ),
    };

    let priority = ["pm1"];

    return priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        (sensor) => sensor["type"] == sensorType
      );
      if (sensors.length >= 1 && sensors[0].values) {
        return typeToGaugeGenerator[sensorType](sensors[0]);
      }
    });
  }

  getStatistics() {
    let latestData = this.state.latestData;
    if (!latestData) {
      return null;
    }
    let id = this.state.latestData["id"];
    let typeToGaugeGenerator = {
      temperature: (sensorData) => (
        <Statistic
          key={id + "temperature"}
          name="Temperature"
          value={sensorData.values[0].value}
          unit="℃"
          icon={<IoMdThermometer className={statisticStyles.leftIcon} />}
        ></Statistic>
      ),
      humidity: (sensorData) => (
        <Statistic
          key={id + "humidity"}
          name="Humidity"
          value={sensorData.values[0].value}
          unit="%"
          icon={<GiWaterDrop className={statisticStyles.leftIcon} />}
        ></Statistic>
      ),
      pressure: (sensorData) => (
        <Statistic
          key={id + "pressure"}
          name="Pressure"
          value={sensorData.values[0].value / 100}
          unit="hPa"
          icon={<IoMdSpeedometer className={statisticStyles.leftIcon} />}
        ></Statistic>
      ),
    };

    let priority = ["temperature", "humidity", "pressure"];

    return priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        (sensor) => sensor["type"] == sensorType
      );
      if (sensors.length >= 1 && sensors[0].values) {
        return typeToGaugeGenerator[sensorType](sensors[0]);
      }
    });
  }

  getStationData(stationId) {
    let key = `station${stationId}Key`;
    fetch(
      getApiUrl("getPopupData", [stationId], {
        strategy: "latest",
      })
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          latestData: data["data"],
        });
      })
      .catch((e) => console.error(e));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { sensorData } = this.props;
    if (
      (this.props.sensorData &&
        prevProps.sensorData &&
        this.props.sensorData["id"] != prevProps.sensorData["id"]) ||
      (this.props.sensorData && !prevProps.sensorData)
    ) {
      this.getStationData(sensorData["id"]);
      this.setState({ visible: true });
    }
  }

  render() {
    const { sensorData } = this.props;
    let noneClass = this.state.isFirst ? "none " : "";

    // only in development mode, it's will be removed, after added communication with api
    this.loadData();

    if (!this.state.latestData) {
      return <div></div>;
    }

    return (
      <div
        className={`stationDetail animated faster ${
          this.state.visible ? "slideInRight" : "slideOutRight"
        }`}
      >
        <div className="stationInside">
          <div className="close close-desktop">
            <Button
              onClick={() => {
                this.props.dispatch(sensorDetailAction(null));
                this.setState({ visible: false });
              }}
            >
              <FaRegTimesCircle
                className="closeIcon"
                size={22}
              ></FaRegTimesCircle>
            </Button>
          </div>
          <ScrollBar
            className="stationList"
            options={{ suppressScrollX: true }}
          >
            <div className="close close-mobile">
              <Button
                onClick={() => {
                  this.props.dispatch(sensorDetailAction(null));
                  this.setState({ visible: false });
                }}
              >
                <FaRegTimesCircle
                  className="closeIcon"
                  size={22}
                ></FaRegTimesCircle>
              </Button>
            </div>
            <div className="card">
              <div className="innerCardSummary">
                <div className="innerCardSummary2">
                  <Cloud1 className="cloud1" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 2000) + "ms"}}/>
                  <Cloud2 className="cloud2" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 2000) + "ms"}}/>
                  <Cloud3 className="cloud3" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 2000) + "ms"}}/>
                  <Cloud1 className="cloud1" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 4000) + "ms"}}/>
                  <Cloud2 className="cloud2" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 4000) + "ms"}}/>
                  <Cloud3 className="cloud3" fill="#0000009d" style={{'animation-delay': "-" + (Math.random() * 5000) + "ms", 'animation-duration' : (Math.random() * 4000 + 4000) + "ms"}}/>
                  <Boy1 className="person"/>
                  <Smile className="person"/>
                  <Cloud1 className="cloud4" fill="#00000033" style={{'animation-delay': "-" + (Math.random() * 30) + "s", 'animation-duration' : (Math.random() * 15 + 15) + "s"}}/>
                  <Cloud2 className="cloud4" fill="#00000033" style={{'animation-delay': "-" + (Math.random() * 30) + "s", 'animation-duration' : (Math.random() * 15 + 15) + "s"}}/>
                  <Cloud3 className="cloud4" fill="#00000033" style={{'animation-delay': "-" + (Math.random() * 30) + "s", 'animation-duration' : (Math.random() * 15 + 15) + "s"}}/>
                  <div className="title">
                    {this.getTitle()}
                  </div>
                </div>
              </div>

              <div className="innerCard">
                <div className="block">
                  <div className="hd">Pollutions:</div>

                  <div className="gaugesRow">{this.getGauges()}</div>
                  <div className="horizontalLine"></div>
                  <div className="statisticsRow">
                    {this.getPollutionStatistics()}
                  </div>
                  {/* <div className="horizontalLine"></div>
					<div className="hd">
						<span className="subInfo">Last measurement: {this.getLastMeasuremtnTime()}</span>
					</div> */}
                </div>
              </div>

              <div className="innerCard">
                <div className="block">
                  <div className="hd">Other statistics:</div>
                  <div className="statisticsRow">{this.getStatistics()}</div>
                </div>
              </div>

              <div className="innerCard">
                <div className="block">
                  <div className="hd">
                    History:
                    <span className="subInfo">
                      Measurements from last 24 hours
                    </span>
                  </div>
                  <div className="sensorChart">
                    {this.props.sensorData != null && (
                      <ChartTabs
                        key={this.props.sensorData.id}
                        stationId={this.props.sensorData.id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollBar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sensorData: state.sensorDetail.sensorData
  };
}

export default connect(mapStateToProps)(SensorDetails);
