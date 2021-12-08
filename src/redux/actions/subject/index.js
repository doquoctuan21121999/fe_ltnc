import subjectProvider from "@data-access/subject";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE-DATA",
      payload: data,
    });
  };
}

function getSubjects() {
  return (dispatch, getState) => {
    subjectProvider
      .search({ page: 0, size: 1000 })
      .then((s) => {
        if (s && s.code === 200) {
          dispatch(
            updateData({
              listSubjects: s.data,
              totalPage: s.totalPages,
            })
          );
        }
      })
      .catch((e) => {});
  };
}

export default {
  getSubjects,
  updateData,
};
