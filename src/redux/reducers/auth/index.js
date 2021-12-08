import clientUtils from "@utils/client-utils";
import cachePrivider from "@data-access/data-cache";

const initState = () => {
    let currentUser = cachePrivider.read("CURRENT_USER", "");
    if (currentUser) clientUtils.auth = "Bearer " + currentUser.token || "";
    return {
        currentUser
    };
};

const reducer = (state = initState(), action) => {
    const { type, payload } = action;
    switch (type) {
        case "AUTH-UPDATE-DATA":
            return {...state, ...payload };
        default:
            return state;
    }
};

export default reducer;