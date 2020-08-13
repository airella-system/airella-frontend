export const setMapPositionRequest = (position) => ({
  type: "MAP_POSITION_REQUEST",
  position,
});

export const sensorDetailAction = (sensorData) => ({
  type: "SENSOR_DETAIL",
  sensorData,
});
