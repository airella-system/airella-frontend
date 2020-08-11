const search = (state = {}, action) => {
  switch (action.type) {
    case "STANDARD_SEARCH": {
      return {
        text: action.text,
      };
    }
    default:
      return state;
  }
};

export default search;
