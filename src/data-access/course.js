import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param) {
        const parameters =
            (param.page ? "?page=" + param.page : "?page=0") +
            (param.size ? "&size=" + param.size : "&size=10") +
            (param.programName ? "&programName=" + param.programName : "") +
            (param.code ? "&code=" + param.code : "") +
            (param.semester ? "&semester=" + param.semester : "") +
            (param.limitRegister ? "&limitRegister=" + param.limitRegister : "") +
            (param.numberLesson ? "&numberLesson=" + param.numberLesson : "") +
            (param.status !== "-1" ? "&status=" + param.status || 1 : "") +
            (param.id ? "&id=" + param.id : "") +
            (param.scheduled ? "&scheduled=" + param.scheduled : "") +
            (param.healthFacilityId ?
                "&healthFacilityId=" + param.healthFacilityId :
                "") +
            (param.nameHealthFacility ?
                "&nameHealthFacility=" + param.nameHealthFacility :
                "") +
            (param.nameCreator ? "&nameCreator=" + param.nameCreator : "") +
            (param.priceFrom ? "&priceFrom=" + param.priceFrom : "") +
            (param.priceTo ? "&priceTo=" + param.priceTo : "")+
            (param.programId ? "&programId=" + param.programId : "")
            ;

        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.courses + parameters, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    getById(id) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("get", constants.api.courses + "/" + id, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
    create(body) {
        return new Promise((resolve, reject) => {
            clientUtils
                .requestApi("post", constants.api.courses, body)
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
                .requestApi("put", constants.api.courses + "/" + id, body)
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
                .requestApi("delete", constants.api.courses + "/" + id, {})
                .then((x) => {
                    resolve(x);
                })
                .catch((e) => {
                    reject(e);
                });
        });
    },
};