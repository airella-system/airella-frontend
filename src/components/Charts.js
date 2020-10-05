import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../style/components/charts.module.scss";
import Input from "./Input";
import Button from "./Button";
import Popup from "./Popup";
import { FaTimes } from "react-icons/fa";
import { setSensorChart } from "../redux/actions";
import { login as loginFunction } from "../config/ApiCalls";

function Charts(props) {

  const close = () => {
    props.dispatch(setSensorChart(false))
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
  };
}

export default connect(mapStateToProps)(Charts);
