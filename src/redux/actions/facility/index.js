import facilityProvider from "@data-access/facility";

function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE-DATA",
            payload: data,
        });
    };
}

function getFacilities() {
    return (dispatch) => {
        facilityProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 200) {
                    dispatch(
                        updateData({
                            listFacilities: s.data,
                            totalPage: s.totalPages
                        })
                    );
                }
            })
            .catch((e) => {});
    };
}

export default {
    getFacilities,
    updateData,
};