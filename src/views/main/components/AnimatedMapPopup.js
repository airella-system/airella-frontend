import React, { Component, useRef, useState, useEffect } from "react";

import { connect } from "react-redux";
import { sensorDetailAction } from "../../../redux/actions";
import { Popup } from "react-leaflet";
import { IconContext } from "react-icons";
import { GiWaterDrop } from "react-icons/gi";
import { IoIosTime, IoMdThermometer } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { RiBarChartFill } from "react-icons/ri";
import { indexToLevel } from '../../../config/AirQuality';
import { FaChevronRight } from "react-icons/fa";
import Button from '../../../components/Button';

import styles from '../../../style/main/components/AnimatedMapPopup.module.scss';
import emojiStyles from '../../../style/main/components/AnimatedMapPopupEmoji.module.scss';
import '../../../style/main/components/AnimatedMapPopup.scss';

function AnimatedMapPopup(props) {
  const emojis = {
    0: emojiStyles.veryGood,
    1: emojiStyles.good,
    2: emojiStyles.ok,
    3: emojiStyles.bad,
    4: emojiStyles.veryBad,
  }

  const vars = {
    distance: 130,
    count: 2,
    sensorValues: {},
    additionalValues: {},
    delayUnit: 0.075,
    containers: [],
    verticalEmojiShift: -16,
  }

  const [currentEmoji, setCurrentEmoji] = useState(emojiStyles.default)

  const [isOpen, setIsOpen] = useState(false)

  const loader = useRef(null);

  const totalCount = () =>
    Object.keys(vars.sensorValues).length +
    Object.keys(vars.additionalValues).length +
    vars.count;

  const translateWidth = (number) => Math.cos(number / totalCount() * 2 * Math.PI + 1.5 * Math.PI) * vars.distance;
  
  const translateHeight = (number) => Math.sin(number / totalCount() * 2 * Math.PI + 1.5 * Math.PI) * vars.distance;
  
  const makeContentContainer = (number, content, onClick=undefined) => (
    <div style={{transform: `translate(${translateWidth(number)}px, ${translateHeight(number)}px)`}}>
      <div className={onClick ? "" : styles.withShadow} onClick={onClick} style={{animationDelay: `${number * vars.delayUnit}s`}}>
        {content}
      </div>
    </div>
  )

  const getSensorValue = (type) => {
    let stored = vars[type];
    if (stored) return stored;

    let sensors = props.stationData.sensors.filter((e) => e.type === type);
    if (sensors.length !== 1) {
      return null;
    }
    let values = sensors[0].values;
    if (values.length !== 1) {
      return null;
    }

    let result = values[0];
    vars.sensorValues[type] = result;
    return result;
  }

  const makeStylizedIcon = (icon, style) => (
    <IconContext.Provider value={{ style: style }}>
      <div className="icon">{icon}</div>
    </IconContext.Provider>
  )

  const showContent = () => {
    let street = props.stationData.address.street;
    let number = props.stationData.address.number;
    let pm1Data = getSensorValue("pm1");
    let pm2_5Data = getSensorValue("pm2_5");
    let pm10Data = getSensorValue("pm10");
    let temperatureData = getSensorValue("temperature");
    let humidityData = getSensorValue("humidity");
    let timestamp = null;
    if (temperatureData) {
      timestamp = new Date(
        Date.parse(temperatureData.timestamp)
      ).toLocaleString("pl-PL", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).split(",");
      vars.additionalValues["timestamp"] = timestamp;
    }

    let i = 0;

    var children = (
      <div className={styles.content}>
        {makeContentContainer(
          i++,
          <div className={styles.address}>
            {street} <br /> {number}
          </div>
        )}
        {pm1Data &&
          makeContentContainer(
            i++,
            <div className={styles.sensorInfo}>
              <div className={styles.key}> PM 1 </div>
              <div className={styles.value}>
                {" "}
                {Math.round(pm1Data.value)} <span>µg/m³</span>{" "}
              </div>
            </div>
        )}
        {pm2_5Data &&
          makeContentContainer(
            i++,
            <div className={styles.sensorInfo}>
              <div className={styles.key}> PM 2.5 </div>
              <div className={styles.value}>
                {" "}
                {Math.round((pm2_5Data.value / 45) * 100)} <span>%</span>{" "}
              </div>
            </div>
        )}
        {pm10Data &&
          makeContentContainer(
            i++,
            <div className={styles.sensorInfo}>
              <div className={styles.key}> PM 10 </div>
              <div className={styles.value}>
                {" "}
                {Math.round((pm10Data.value / 45) * 100)} <span>%</span>{" "}
              </div>
            </div>
        )}
        {makeContentContainer(i++, (
          <Button isCircle={true} isFilling={true}>
            <div>
              <IconContext.Provider value={{ style: {fontSize: '30px'} }}>
                <div className={styles.iconPack}>
                  <div className={styles.iconRow}>
                    <div className="icon"><FaChevronRight/></div>
                    <div className="icon"><RiBarChartFill/></div>
                  </div>
                  <div className={styles.iconRow}>
                    <div className="icon"><BsThreeDots/></div>
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          </Button>
        ), () => props.dispatch(sensorDetailAction(props.stationData)))}
        {timestamp &&
          makeContentContainer(
            i++,
            <div>
              {makeStylizedIcon(<IoIosTime />, { fontSize: "30px" })}{" "}
              {timestamp[0]}
              <br />
              {timestamp[1]}
            </div>
        )}
        {humidityData &&
          makeContentContainer(
            i++,
            <div>
              {makeStylizedIcon(<GiWaterDrop />, { fontSize: "30px" })}{" "}
              {humidityData.value.toFixed(2) + " %"}
            </div>
        )}
        {temperatureData &&
          makeContentContainer(
            i++,
            <div>
              {makeStylizedIcon(<IoMdThermometer />, { fontSize: "30px" })}{" "}
              {temperatureData.value.toFixed(2) + " °C"}
            </div>
        )}
      </div>
    );

    return children;
  }

  const pauseLoader = () => {
    let ref = loader.current
    ref.addEventListener(
      "animationiteration",
      () => (ref.style.animationPlayState = "paused")
    )
  }

  const resumeLoader = () => {
    loader.current.style.animationPlayState = "running"
  }

  const onPopupClose = () => {
    setIsOpen(false)
    setCurrentEmoji(emojiStyles.default)
    resumeLoader()
  }

  const onPopupOpen = () => {
    setIsOpen(true)
  }

  useEffect(() => {
    if (isOpen && props.stationData) {
      pauseLoader()
      let level = indexToLevel(props.stationData.aqi)
      setCurrentEmoji(emojis[level])
    } else {
      setCurrentEmoji(emojiStyles.default)
    }
  })

  return (
    <Popup
      className="customPopup"
      closeButton={false}
      onClose={onPopupClose}
      onOpen={onPopupOpen}
      autoPan={false}
    >
      <div className={styles.children}>
        <div className={styles.point}>
          <div className={`${styles.morphEmoji} ${currentEmoji}`}>
            <div
              className={emojiStyles.topleft}
              style={{ background: props.color }}
            />
            <div
              className={emojiStyles.topright}
              style={{ background: props.color }}
            />
            <div
              className={emojiStyles.bottom}
              style={{ background: props.color }}
            />
          </div>
        </div>
        <div className={styles.loader}>
          <div ref={loader}/>
        </div>
        {props.stationData && showContent()}
      </div>
    </Popup>
  )
}

export default connect()(AnimatedMapPopup);
