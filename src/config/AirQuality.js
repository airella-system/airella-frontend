import React from 'react';
import { FaRegLaugh, FaRegSmile, FaRegMeh, FaRegFrownOpen, FaRegTired } from "react-icons/fa";

export let AirQualityColors = {
  0: '#79bc6a',
  1: '#bbcf4c',
  2: '#eec20b',
  3: '#f29305',
  4: '#e8416f',
}

export let AirQualityIcons = {
  0: <FaRegLaugh />,
  1: <FaRegSmile />,
  2: <FaRegMeh />,
  3: <FaRegFrownOpen />,
  4: <FaRegTired />,
}

export let indexToLevel = (airQialityIndex) => {
  return Math.min(Math.floor(airQialityIndex / 25), 4);
}
