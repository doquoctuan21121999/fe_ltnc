import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param) {
        const parameters =
            (param.page ? "?page=" + param.page : "?page=0") +
            (param.size ? "&size=" + param.size : "&size=10") +
            (param.subjectId ? "&subjectId=" + param.subjectId : "") +
            (param.courseId ? "&courseId=" + param.courseId : "");

        console.log(param);
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.class + parameters, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};