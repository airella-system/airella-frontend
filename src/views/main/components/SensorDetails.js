import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sensorDetailAction } from "../../../redux/actions";
import { FaRegTimesCircle } from "react-icons/fa";
import { stationDetailDataMock } from "../../../mocks/StationDetailApiMock";
import Gauge from "../../../components/Gauge";
import "../../../style/main/components/SensorDetails.scss";
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

  pmToPrecentage(type, value) {
    let norm = 1;
    switch (type) {
      case "pm2_5":
        norm = 25;
        break;
      case "pm10":
        norm = 50;
        break;
      default:
        return "";
    }
    return Math.round((value / norm) * 100) + "%";
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
          norm={25}
          unit="µg/m³"
        ></Gauge>
      ),
      pm10: (sensorData) => (
        <Gauge
          key={id + "PM10"}
          name="PM10"
          value={sensorData.values[0].value}
          norm={50}
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
          value={sensorData.values[0].value}
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
              <div className="innerCard">
                <div className="holder">
                  <div>{this.getTitle()}</div>
                </div>
                <div className="hd">Air quality:</div>

                <div className="summaryContainer">
                  <div className="summaryImageContainer">
                    <div className="summary"></div>
                  </div>

                  <Gauge
                    key={this.state.latestData["id"]}
                    name="AQI"
                    value={Math.round(this.state.latestData.aqi)}
                    norm={50}
                    lineWidth={20}
                  ></Gauge>
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

function stateToProps(state) {
  return state.sensorDetail;
}

export default connect(stateToProps)(SensorDetails);
