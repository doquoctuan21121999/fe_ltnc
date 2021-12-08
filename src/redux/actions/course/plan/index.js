import courseProvider from "@data-access/course";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE-DATA",
      payload: data,
    });
  };
}

function getCourses(param) {
  return (dispatch) => {
    courseProvider
      .search(param || { page: 0, size: 1000, status: 1 })
      .then((s) => {
        if (s && s.code === 200) {
          dispatch(
            updateData({
              listCoursePlan: s.data,
              totalPage: s.totalPages,
            })
          );
        }
      })
      .catch((e) => {});
  };
}

export default {
  getCourses,
  updateData,
};
