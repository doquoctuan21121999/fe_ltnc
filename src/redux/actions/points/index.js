export const updateData = (data) => (dispatch) => {
  dispatch({
    type: "SAVE-PROVISIONAL",
    data,
  });
};
