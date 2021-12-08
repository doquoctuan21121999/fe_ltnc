import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    // search(param) {
    //     const parameters =
    //         (param.page ? "?page=" + param.page : "?page=0") +
    //         (param.size ? "&size=" + param.size : "&size=10") +
    //         (param.name ? "&name=" + param.name : "") +
    //         (param.level ? "&level=" + param.level : "") +
    //         (param.address ? "&address=" + param.address : "");

    //     return new Promise((resolve, reject) => {
    //         clientUtils
    //             .requestApi("get", constants.api.healthFacility + parameters, {})
    //             .then((x) => {
    //                 resolve(x);
    //             })
    //             .catch((e) => {
    //                 reject(e);
    //             });
    //     });
    // },
    create(body) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("post", constants.api.classPoint, body)
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    update(body, id) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("put", constants.api.classPoint + "/" + id, body)
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    delete(id) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("delete", constants.api.classPoint + "/" + id, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};