import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param) {
        const parameters =
            (param.page ? "?page=" + param.page : "?page=0") +
            (param.size ? "&size=" + param.size : "&size=10") +
            (param.courseId ? "&courseId=" + param.courseId : "") +
            (param.semester ? "&semester=" + param.semester : "") +
            (param.studentId ? "&studentId=" + param.studentId : "") +
            (param.name ? "&name=" + param.name : "");

        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.registerCourse + parameters, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    register(body) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("post", constants.api.registerCourse, body)
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    update(id, body) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("put", constants.api.registerCourse + "/" + id, body)
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
                .requestApi("delete", constants.api.registerCourse + "/" + id, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    getSemesters(param) {
        // student see result
        const parameters = param.courseId ? "?courseId=" + param.courseId : "";
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi(
                    "get",
                    constants.api.registerCourse + "/get-list-semester" + parameters, {}
                )
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};