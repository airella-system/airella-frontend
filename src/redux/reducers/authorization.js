const authorization = (state = {}, action) => {
  switch (action.type) {
    case "AUTHORIZATION": {
      return {
        tokens: {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
      };
    }
    default:
      return state;
  }
};

export default authorization;