import courseProvider from "@data-access/course";

function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE-DATA",
            data: data,
        });
    };
}

function getCourses() {
    return (dispatch, getState) => {
        courseProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 0) {
                    dispatch(
                        updateData({
                            listCourse: s.data,
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