const authorization = (state = {}, action) => {
  switch (action.type) {
    case "AUTHORIZATION": {
      return {
        logged: action.logged,
      };
    }
    default:
      return state;
  }
};

export default authorization;