import scheduleProvider from "@data-access/schedule";

function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE-DATA",
            data: data,
        });
    };
}

function getSchedules() {
    return (dispatch, getState) => {
        scheduleProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 0) {
                    dispatch(
                        updateData({
                            listSchedule: s.data,
                        })
                    );
                }
            })
            .catch((e) => {});
    };
}

export default {
    getSchedules,
    updateData,
};