import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sensorDetailAction, setSensorChart } from "../../../redux/actions";
import { FaTimes } from "react-icons/fa";
import { stationDetailDataMock } from "../../../mocks/StationDetailApiMock";
import Gauge from "../../../components/Gauge";
import Summary from "./Summary";
import "../../../style/main/components/SensorDetails.scss";

import { AirQualityIcons, indexToLevel } from "../../../config/AirQuality";
import ChartTabs from "./ChartTabs.js";
import Button from "../../../components/Button";
import { getApiUrl } from "../../../config/ApiURL";
import ScrollBar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Statistic from "../../../components/Statistic";
import { IoMdThermometer, IoMdSpeedometer, IoIosTime } from "react-icons/io";
import { GiWaterDrop } from "react-icons/gi";
import { WiSmoke } from "react-icons/wi";
import { AiOutlineLineChart } from "react-icons/ai";
import { fetchWithAuthorization } from "../../../config/ApiCalls"
import usePrevious from "../../../common/UsePrevious"

import statisticStyles from "../../../style/components/statistic.module.scss";

function SensorDetails(props) {
  const timer = useRef(null)
  const [stationDetal, setStationDetal] = useState(null)
  const [visible, setVisible] =useState(false)
  const [latestData, setLatestData] = useState(null)
  const prevSensorData = usePrevious(props.sensorData)

  const loadData = () => {
    //TODO: send api request
    setStationDetal(stationDetailDataMock);
  }

  const getQualityClassColor = airQialityIndex => {
    return "quality_" + indexToLevel(airQialityIndex);
  }

  const getAirQualityIcon = () => {
    return AirQualityIcons[indexToLevel(stationDetal.airQuality)];
  }

  const getLastMeasuremtnTime = () => {
    if (!latestData)
      return null

    let lastTimestamp = latestData.sensors[0].values[0].timestamp;
    let dateTime = new Date(lastTimestamp);
    return dateTime.toLocaleString("en-US");
  }

  const getTitle = () => {
    if (!latestData)
      return null
    return `${latestData.address.city}, ${latestData.address.street} ${latestData.address.number}`
  }

  const getGauges = () => {
    if (!latestData)
      return null
      
    let id = latestData["id"];
    let typeToGaugeGenerator = {
      pm2_5: sensorData => (
        <Gauge
          key={id + "PM2.5"}
          name="PM2.5"
          value={sensorData.values[0].value}
          percent={sensorData.status}
          unit="µg/m³"
        />
      ),
      pm10: sensorData => (
        <Gauge
          key={id + "PM10"}
          name="PM10"
          value={sensorData.values[0].value}
          percent={sensorData.status}
          unit="µg/m³"
        />
      ),
    }

    let priority = ["pm2_5", "pm10"];

    return priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        sensor => sensor["type"] == sensorType
      )
      if (sensors.length >= 1 && sensors[0].values)
        return typeToGaugeGenerator[sensorType](sensors[0])
    })
  }

  const getPollutionStatistics = () => {
    if (!latestData)
      return null
      
    let id = latestData["id"];
    let typeToGaugeGenerator = {
      pm1: sensorData => (
        <Statistic
          type="pollution"
          key={id + "PM1"}
          name="PM1"
          value={sensorData.values[0].value}
          unit="µg/m³"
          icon={<WiSmoke className={statisticStyles.leftIcon} />}
        />
      ),
    }

    let priority = ["pm1"];

    return priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        sensor => sensor["type"] == sensorType
      )
      if (sensors.length >= 1 && sensors[0].values)
        return typeToGaugeGenerator[sensorType](sensors[0])
    })
  }

  const getStatistics = () => {
    if (!latestData)
      return null
      
    let id = latestData["id"];
    let typeToGaugeGenerator = {
      temperature: sensorData => (
        <Statistic
          key={id + "temperature"}
          name="Temperature"
          value={sensorData.values[0].value}
          unit="℃"
          icon={<IoMdThermometer className={statisticStyles.leftIcon} />}
        />
      ),
      humidity: sensorData => (
        <Statistic
          key={id + "humidity"}
          name="Humidity"
          value={sensorData.values[0].value}
          unit="%"
          icon={<GiWaterDrop className={statisticStyles.leftIcon} />}
        />
      ),
      pressure: sensorData => (
        <Statistic
          key={id + "pressure"}
          name="Pressure"
          value={sensorData.values[0].value / 100}
          unit="hPa"
          icon={<IoMdSpeedometer className={statisticStyles.leftIcon} />}
        />
      ),
    }

    let priority = ["temperature", "humidity", "pressure"];

    let timestamp = null;
    let statistics = []
    statistics.push(priority.map((sensorType) => {
      let sensors = latestData["sensors"].filter(
        (sensor) => sensor["type"] == sensorType
      )
      if (sensors.length >= 1 && sensors[0].values) {
        if (timestamp == null && sensors[0].values.length >= 1 && sensors[0].values[0].timestamp) {
          timestamp = sensors[0].values[0].timestamp
        }
        return typeToGaugeGenerator[sensorType](sensors[0])
      }
    }))

    if (timestamp != null) {
      timestamp = new Date(
        Date.parse(timestamp)
      ).toLocaleString("pl-PL", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).split(",");

      statistics.push(
        <Statistic
          type="timestamp"
          key={id + "timestamp"}
          name="Result time"
          value={timestamp}
          unit=""
          icon={<IoIosTime className={statisticStyles.leftIcon} />}
      />)
    }

    return statistics;
  }

  const getStationData = stationId => {
    let key = `station${stationId}Key`;
    fetchWithAuthorization(
      getApiUrl("getPopupData", [stationId], {
        strategy: "latest",
      })
    )
    .then((response) => response.json())
    .then((data) => {
      data.data.aqi = Math.random() * 500;
      for (let i = 0; i < 6; i++) {
        data.data.sensors[i].values[0].value=Math.random() * 100;
        data.data.sensors[i].status=Math.random();
      }
      setLatestData(data["data"])}
      )
    .catch((e) => console.error(e));
  }

  useEffect(() => {
    const { sensorData } = props;
    if (
      (sensorData &&
        prevSensorData &&
        sensorData["id"] != prevSensorData["id"]) ||
      (sensorData && !prevSensorData)
    ) {
      getStationData(sensorData["id"])
      setVisible(true)
    }
  })

  useEffect(() => {
    const { sensorData } = props;
    clearInterval(timer.current)
    if (visible && sensorData["id"]) {
      timer.current = setInterval(() => getStationData(props.sensorData["id"]), 1000 * 1);
    }
  }, [visible, props.sensorData])

  // this works exactly like componentWillUnmount
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);


  if (!latestData) {
    return <div></div>;
  } else {
    return (
      <div>
        <div
          className={`stationDetail animated faster ${
            visible ? "slideInRight" : "slideOutRight"
          }`}
        >
          <div className="stationInside">
            <div className="close close-desktop">
              <Button
                onClick={() => {
                  props.dispatch(sensorDetailAction(null))
                  setVisible(false)
                }}
              >
                <FaTimes className="closeIcon" size={22} rotate={45} />
              </Button>
            </div>
            <ScrollBar
              className="stationList"
              options={{ suppressScrollX: true }}
            >
              <div className="close close-mobile">
                <Button
                  onClick={() => {
                    props.dispatch(sensorDetailAction(null))
                    setVisible(false)
                  }}
                >
                  <FaTimes className="closeIcon" size={22} rotate={45} />
                </Button>
              </div>
              <div className="card">
                <Summary id={latestData.id} title={getTitle()} aqi={Math.round(latestData.aqi)}/>
                <div className="innerCard">
                  <div className="hd">Pollutions:</div>

                  <div className="gaugesRow">{getGauges()}</div>
                  <div className="horizontalLine"></div>
                  <div className="statisticsRow">
                    {getPollutionStatistics()}
                  </div>
                </div>

                <div className="innerCard">
                  <div className="hd">Other statistics:</div>
                  <div className="statisticsRow">{getStatistics()}</div>
                </div>

                <div className="innerCard">
                  <div className="hd">
                    <div className="chartHdColumns">
                      <div className="mainColumn">
                        History:
                        <span className="subInfo">
                          Measurements from last 24 hours
                        </span>
                      </div>
                      <div className="secondaryColumn">
                        <Button onClick={() => props.dispatch(setSensorChart(true))}>
                          <AiOutlineLineChart className="chartIcon" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="sensorChart">
                    {props.sensorData != null && (
                      <ChartTabs
                        key={props.sensorData.id}
                        stationId={props.sensorData.id}
                      />
                    )}
                  </div>
                </div>
              </div>
            </ScrollBar>
          </div>
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
