const initState = {
  listSubjects: [],
  totalPage: 0,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE-DATA":
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
