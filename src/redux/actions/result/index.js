import resultProvider from "@data-access/result";

function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE-DATA",
            data: data,
        });
    };
}

function getResults() {
    return (dispatch, getState) => {
        resultProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 0) {
                    dispatch(
                        updateData({
                            listResults: s.data,
                        })
                    );
                }
            })
            .catch((e) => {});
    };
}

export default {
    getResults,
    updateData,
};