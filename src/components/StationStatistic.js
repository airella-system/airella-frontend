import React, { useState, useEffect, useRef } from "react";
import Accordion from "./Accordion";
import { getApiUrl } from "../config/ApiURL";
import Chart from "chart.js";
import StationEnumStatistic from "./StationEnumStatistic";
import StationFloatStatistic from "./StationFloatStatistic";

const StationStatistic = (props) => {
  if (props.type == "MULTIPLE_ENUMS") {
    return (
      <StationEnumStatistic
        stationId={props.stationId}
        statisticId={props.statisticId}
      ></StationEnumStatistic>
    );
  } else if (props.type == "MULTIPLE_FLOATS") {
    return (
      <StationFloatStatistic
        stationId={props.stationId}
        statisticId={props.statisticId}
      ></StationFloatStatistic>
    );
  }
};

export default StationStatistic;
