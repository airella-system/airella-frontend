import React from "react";
import {
  FaRegLaugh,
  FaRegSmile,
  FaRegMeh,
  FaRegFrownOpen,
  FaRegTired,
} from "react-icons/fa";
import { 
  pm1Color, 
  pm2_5Color, 
  pm10Color, 
  temperatureColor, 
  pressureColor, 
  humidityColor, 
} from "../style/const/sensors.scss"

export const AirQualityColors = {
  // 0: "#79bc6a",
  // 1: "#bbcf4c",
  // 2: "#eec20b",
  // 3: "#f29305",
  // 4: "#e8416f",
  0: "#56b94d",
  1: "#a8c449",
  2: "#ffc94b",
  3: "#f68844",
  4: "#ed4740",
};

export const AirQualityIcons = {
  0: <FaRegLaugh />,
  1: <FaRegSmile />,
  2: <FaRegMeh />,
  3: <FaRegFrownOpen />,
  4: <FaRegTired />,
};

export const indexToLevel = (aqi) => {
  if (aqi <= 25) return 0;
  else if (aqi <= 50) return 1;
  else if (aqi <= 75) return 2;
  else if (aqi <= 100) return 3;
  return 4;
};

export const sensors = {
  pm1: { 
    label: "PM1", 
    color: pm1Color, 
    defaultSelection: true,
    unit: "µg/m³",
  },
  pm2_5: { 
    label: "PM2.5", 
    color: pm2_5Color, 
    defaultSelection: true,
    unit: "µg/m³",
  },
  pm10: { 
    label: "PM10", 
    color: pm10Color, 
    defaultSelection: true,
    unit: "µg/m³",
  },
  temperature: { 
    label: "Temperature", 
    color: temperatureColor, 
    defaultSelection: false,
    unit: "℃",
  },
  pressure: { 
    label: "Pressure", 
    color: pressureColor, 
    defaultSelection: false,
    unit: "Pa",
    map: {
      factor: 0.01,
      unit: "hPa",
    }
  },
  humidity: { 
    label: "Humidity", 
    color: humidityColor, 
    defaultSelection: false,
    unit: "%",
  },
}