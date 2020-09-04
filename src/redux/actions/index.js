export const setMapPositionRequest = (position) => ({
  type: "MAP_POSITION_REQUEST",
  position,
});

export const sensorDetailAction = (sensorData) => ({
  type: "SENSOR_DETAIL",
  sensorData,
});

export const setLoginDialogVisibility = (visibility) => ({
  type: "LOGIN_DIALOG_VISIBLE",
  visibility,
});
