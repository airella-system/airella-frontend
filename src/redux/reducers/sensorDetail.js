const sensorDetail = (state = {}, action) => {
	switch (action.type) {
		case 'SENSOR_DETAIL': {
			return {
				sensorData: action.sensorData,
			}
		}
		default:
			return state
	}
}
  
export default sensorDetail