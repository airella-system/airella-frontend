import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../style/components/chartsModal.module.scss";
import Button from "./Button";
import Popup from "./Popup";
import { FaTimes } from "react-icons/fa";
import { setSensorChart } from "../redux/actions";
import ChartTabs from "../views/main/components/ChartTabs";
import Charts from "./Charts"
import { sensors } from "../config/AirQuality"

function ChartsMenu(props) {

  const [showData, setShowData] = useState(props.showData)

  const handleCheckboxChange = event => {
    setShowData({
      ...showData,
      [event.target.name]: event.target.checked,
    })
  }

  return (
    <div className={styles.menu}>  
      <div className={styles.checkboxContainer}>
        {Object.entries(showData).map(([name, value]) => {
          return (
            <div className={styles[name]} key={name}>
              <label className={styles.container}>
                {sensors[name].label}
                <input name={name} type="checkbox" checked={value} onChange={handleCheckboxChange}/>
                <span className={styles.checkmark}/>
                <span className={styles.checkmarkInner}/>
                <span className={styles.checkmarkOuter}/>
              </label>
            </div>
            )
        })}
      </div>
      <Button onClick={() => props.onApplyClick && props.onApplyClick(showData)}>
        APPLY
      </Button>
    </div>
  )
}

function ChartsModal(props) {
  
  const [showData, setShowData] = useState({})
  
  const close = () => {
    props.dispatch(setSensorChart(false))
  }

  const onApplyClick = values => {
    setShowData(values)
  }

  const getSelectedSensors = () => {
    return Object.keys(showData).reduce((result, key) => {
      if (showData[key])
        result.push(key)
      return result
    }, [])
  }

  useEffect(() => {
    if (!props.sensorData)
      return
    var initialShowData = {}
    for (const data of props.sensorData.sensors)
      initialShowData = {
        ...initialShowData,
        [data.id]: sensors[data.id].defaultSelection,
      }
    setShowData(initialShowData)
  }, [props.sensorData])

  return (
    <Popup visibility={props.visibility} onOutsideClick={close}>
      {
        props.visibility ? (
          <div className={styles.chartsBox}>
            <div className={styles.close}>
              <Button onClick={() => close()}>
                <FaTimes size={22} rotate={45} />
              </Button>
            </div>
            <ChartsMenu showData={showData} onApplyClick={onApplyClick}/>
            <div className={styles.chartContainer}>
              {props.sensorData != null && (
                <Charts
                  stationId={props.sensorData.id}
                  selectedSensors={getSelectedSensors()}
                />
              )}
            </div>
          </div>
        ) : (
          <div className={styles.chartsBox}></div>
        )
      }
    </Popup>
  )
}

function mapStateToProps(state) {
  return {
    visibility: state.sensorChart.visibility,
    sensorData: state.sensorDetail.sensorData,
  };
}

export default connect(mapStateToProps)(ChartsModal);
