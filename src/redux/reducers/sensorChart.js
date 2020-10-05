const sensorChart = (state = {}, action) => {
  switch (action.type) {
    case "SENSOR_CHART": {
      return {
        visibility: action.visibility,
      };
    }
    default:
      return state;
  }
};

export default sensorChart;