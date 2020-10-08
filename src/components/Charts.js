import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../style/components/charts.module.scss";
import Input from "./Input";
import Button from "./Button";
import Popup from "./Popup";
import { FaTimes } from "react-icons/fa";
import { setSensorChart } from "../redux/actions";
import ChartTabs from "../views/main/components/ChartTabs";

function ChartsMenu(props) {
  const [showData, setShowData] = useState({})

  const handleCheckboxChange = event => {
    setShowData({
      ...showData,
      [event.target.name]: event.target.checked,
    })
  }

  useEffect(() => {
    if (!props.sensorData)
      return
    var initialShowData = {}
    for (const data of props.sensorData.sensors)
      initialShowData = {
        ...initialShowData,
        [data.id]: false,
      }
    setShowData(initialShowData)
  }, [props.sensorData])

  return (
    <div className={styles.menu}>  
      <div className={styles.checkboxContainer}>
        {Object.entries(showData).map(([name, value]) => {
          return (
            <label className={styles.container} key={name}>
              {name}
              <input name={name} type="checkbox" checked={value} onChange={handleCheckboxChange}/>
              <span className={styles.checkmark}/>
              <span className={styles.checkmarkInner}/>
              <span className={styles.checkmarkOuter}/>
            </label>
            )
        })}
      </div>
      <Button onClick={() => props.onApplyClick && props.onApplyClick(showData)}>
        APPLY
      </Button>
    </div>
  )
}

function Charts(props) {
  
  const [showData, setShowData] = useState({})

  const close = () => {
    props.dispatch(setSensorChart(false))
  }

  const onApplyClick = values => {
    console.log("apply")
    console.log(values)
  }

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
            <ChartsMenu sensorData={props.sensorData} onApplyClick={onApplyClick}/>
            <div className={styles.chartContainer}>
              {props.sensorData != null && (
                <ChartTabs
                  key={props.sensorData.id}
                  stationId={props.sensorData.id}
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

export default connect(mapStateToProps)(Charts);
