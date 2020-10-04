import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import styles from "../style/components/StationStatistic.module.scss";
import { fetchWithAuthorization } from "../config/ApiCalls";

const StationOneStringStatistic = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchWithAuthorization(
      getApiUrl("getStationStatistic", [props.stationId, props.statisticId], {})
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.data);
      });
  }, [props.stationId, props.statisticId]);
  return (
    <div className={styles.card}>
      <div className={styles.name}>{data && data.name}</div>
      <div className={styles.content}>
        <div className={styles.oneStringContent}>
          {data && data.values && data.values[0] && data.values[0].value}
        </div>
      </div>
    </div>
  );
};

export default StationOneStringStatistic;
