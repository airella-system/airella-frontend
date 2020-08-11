export const setSearch = (text) => ({
  type: "STANDARD_SEARCH",
  text,
});

export const sensorDetailAction = (sensorData) => ({
  type: "SENSOR_DETAIL",
  sensorData,
});
