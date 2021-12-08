import userProvider from "@data-access/user";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UPDATE-DATA",
      payload: data,
    });
  };
}

function getUsers(params) {
  return (dispatch) => {
    userProvider
      .search(params || { page: 0, size: 10 })
      .then((s) => {
        if (s && s.code === 200) {
          dispatch(
            updateData({
              listUsers: s.data,
              totalPage: s.totalPages,
            })
          );
        }
      })
      .catch((e) => {});
  };
}

export default {
  getUsers,
  updateData,
};
