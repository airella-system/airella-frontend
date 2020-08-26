import React from "react";
import {
  FaRegLaugh,
  FaRegSmile,
  FaRegMeh,
  FaRegFrownOpen,
  FaRegTired,
} from "react-icons/fa";

export let AirQualityColors = {
  0: "#79bc6a", //"#56b94d",
  1: "#bbcf4c", //"#a8c449",
  2: "#eec20b", //"#ffc94b",
  3: "#f29305", //"#f68844",
  4: "#e8416f", //"#ed4740",
};

export let AirQualityIcons = {
  0: <FaRegLaugh />,
  1: <FaRegSmile />,
  2: <FaRegMeh />,
  3: <FaRegFrownOpen />,
  4: <FaRegTired />,
};

export let indexToLevel = (aqi) => {
  if (aqi <= 25) return 0;
  else if (aqi <= 50) return 1;
  else if (aqi <= 75) return 2;
  else if (aqi <= 100) return 3;
  return 4;
};
