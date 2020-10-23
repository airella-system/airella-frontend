import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Button from "./Button";
import Popup from "./Popup";
import { FaTimes } from "react-icons/fa";
import { setSensorChart } from "../redux/actions";
import Charts from "./Charts"
import { sensors } from "../config/AirQuality"
import DatePicker from "react-datepicker";
import styles from "../style/components/chartsModal.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../style/components/chartsModal.scss";

function DateTimePicker(props) {
  return (
    <DatePicker
      selected={props.selected ? props.selected : new Date()}
      onChange={date => props.handleChange && props.handleChange(date)}
      maxDate={new Date()}
      showTimeSelect
      dateFormat="MMMM d, yyyy HH:mm"
      timeFormat="HH:mm"
    />
  );
}

function ChartsMenu(props) {

  const [showData, setShowData] = useState(props.showData)
  const [fromDate, setFromDate] = useState(props.fromDate || new Date())
  const [toDate, setToDate] = useState(props.toDate || new Date())

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
          const info = sensors[name]
          return (
            <div className={styles[name]} key={name}>
              <label className={styles.container}>
                <div className={styles.description}>
                  <div className={styles.label}>
                    {info.label}
                  </div>
                  <div className={styles.unit}>
                    {`(${info.conversion ? info.conversion.unit : info.unit})`}
                  </div>
                </div>
                <input name={name} type="checkbox" checked={value} onChange={handleCheckboxChange}/>
                <span className={styles.checkmark}/>
                <span className={styles.checkmarkInner}/>
                <span className={styles.checkmarkOuter}/>
              </label>
            </div>
            )
        })}
      </div>
      <div className={styles.innerRightContainer}>
        <div className={styles.dateContainer}>
          <div className={styles.dateDescriptor}>
            FROM
          </div>
          <DateTimePicker 
            selected={fromDate} 
            handleChange={setFromDate}
          />
        </div>
        <div className={styles.dateContainer}>
          <div className={styles.dateDescriptor}>
            TO
          </div>
          <DateTimePicker 
            selected={toDate} 
            handleChange={setToDate}
          />
        </div>
        <div className={styles.applyButton}>
          <Button onClick={() => props.onApplyClick && props.onApplyClick(showData, fromDate, toDate)}>
            APPLY
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChartsModal(props) {
  
  const [showData, setShowData] = useState({})
  const [fromDate, setFromDate] = useState(new Date(new Date().getTime() - 1000 * 60 * 60 * 24))
  const [toDate, setToDate] = useState(new Date())
  
  const close = () => {
    props.dispatch(setSensorChart(false))
  }

  const onApplyClick = (selected, fromDate, toDate) => {
    setShowData(selected)
    setFromDate(fromDate)
    setToDate(toDate)
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
    for (const data of props.sensorData.sensors.sort((a, b) => sensors[a.id].order - sensors[b.id].order))
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
            <ChartsMenu 
              showData={showData} 
              onApplyClick={onApplyClick} 
              fromDate={fromDate}
              toDate={toDate}
            />
            <div className={styles.chartContainer}>
              {props.sensorData != null && (
                <Charts
                  stationId={props.sensorData.id}
                  selectedSensors={getSelectedSensors()}
                  fromDate={fromDate}
                  toDate={toDate}
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
