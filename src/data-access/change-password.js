import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

export default {
    changePass(body) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("put", constants.api.changePass, body)
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};