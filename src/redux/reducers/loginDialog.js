const loginDialog = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_DIALOG_VISIBLE": {
      return {
        visibility: action.visibility,
      };
    }
    default:
      return state;
  }
};

export default loginDialog;
