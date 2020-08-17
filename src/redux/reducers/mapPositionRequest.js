const mapPositionRequest = (state = {}, action) => {
  switch (action.type) {
    case "MAP_POSITION_REQUEST": {
      return {
        position: action.position,
      };
    }
    default:
      return state;
  }
};

export default mapPositionRequest;
