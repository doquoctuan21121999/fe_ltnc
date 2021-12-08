import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {

    getDashboardData(namKhaoSat) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.dashboard + "?namKhaoSat=" + namKhaoSat, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
 
};