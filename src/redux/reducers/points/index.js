const initState = {
  params: {
    page: 0,
    size: 10,
  },
};

const reducer = (state = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case "UPDATE-DATA":
      return { ...state, ...data };
    case "SAVE-PROVISIONAL":
      // console.log(data, state);
      state = data;
      return { ...data };
    default:
      return state;
  }
};

export default reducer;
