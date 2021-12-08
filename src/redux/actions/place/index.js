import placeProvider from "@data-access/place";

function updateData(data) {
    console.log("update data");
    return (dispatch) => {
        dispatch({
            type: "UPDATE-DATA",
            payload: data,
        });
    };
}

function getPlaces() {
    return (dispatch) => {
        placeProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 200) {
                    dispatch(
                        updateData({
                            listPlaces: s.data,
                            totalPage: s.totalPages
                        })
                    );
                }
            })
            .catch((e) => {});
    };
}

export default {
    getPlaces,
    updateData,
};