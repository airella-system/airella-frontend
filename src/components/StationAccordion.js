import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import StationStatistic from "./StationStatistic";
import styles from "../style/components/StationAccordion.module.scss";

const StationAccordion = (props) => {
  const [content, setContent] = useState(null);
  const [contentOpened, setContentOpened] = useState(null);

  const onAccordionButtonClick = () => {
    if (contentOpened) {
      setContentOpened(false)
    } else {
      fetch(getApiUrl("getStationStatistics", [props.station.id], {}))
      .then((data) => data.json())
      .then((data) => {
        setContent(
          data.data.statistics.map((value, index) => {
            return (
              <StationStatistic
                key={value.id}
                type={value.type}
                stationId={props.station.id}
                statisticId={value.id}
              ></StationStatistic>
            );
          })
        );
        setContentOpened(true)
      });
    }
  };

  return (
    <Accordion
      key={props.station.id}
      titleComponent={<div className={styles.title}>{props.station.name}</div>}
      onClick={() => {
        onAccordionButtonClick();
      }}
      open={contentOpened}
    >
      <div className={styles.statistics}>
        {content}
      </div>
    </Accordion>
  );
};

export default StationAccordion;
