import programProvider from "@data-access/program";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE-DATA",
      payload: data,
    });
  };
}

function getPrograms(params) {
  return (dispatch) => {
    programProvider
      .search(params || { page: 0, size: 1000 })
      .then((s) => {
        if (s && s.code === 200) {
          dispatch(
            updateData({
              listPrograms: s.data,
              totalPage: s.totalPages
            })
          );
        }
      })
      .catch((e) => {});
  };
}

export default {
  getPrograms,
  updateData,
};
