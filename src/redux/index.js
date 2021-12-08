import constants from '../resourses/const';
import clientUtils from '../utils/client-utils';

const defaultState = {
    userApp: {
        currentUser: {

        },
        image: "",
        isLogin: false,
        token: "",
        email: ''
    }
}

const reducer = (state = defaultState, action) => {
    var newState = JSON.parse(JSON.stringify(state));
    console.log(newState.userApp.token);
    switch (action.type) {
        case constants.action.action_user_login:
            newState.userApp.currentUser = action.value ? action.value : newState.userApp.currentUser;
            newState.userApp.isLogin = action.value ? true : false; //newState.userApp.currentUser && newState.userApp.currentUser.id;
            newState.userApp.token = action.value ? "Bearer " + action.value.token : "";
            clientUtils.auth = newState.userApp.token ? newState.userApp.token : '';
            return newState;
        case constants.action.action_user_logout:
            newState.userApp.currentUser = {};
            newState.userApp.isLogin = false;
            newState.userApp.token = "";
            clientUtils.auth = '';
            return newState;
        default:
            {}
    }
    return newState;
}

export default reducer