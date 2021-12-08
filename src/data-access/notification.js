import clientUtils from "../utils/client-utils";
import constants from "../utils/const";
import strins from "../utils/strings";
export default {
  search(param) {
    const parameters =
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.username ? "&username=" + param.username : "") +
      (param.fullName ? "&fullName=" + param.fullName : "") +
      (param.phoneNumber ? "&phoneNumber=" + param.phoneNumber : "") +
      (param.address ? "&address=" + param.address : "") +
      (param.email ? "&email=" + param.email : "") +
      (param.age ? "&age=" + param.age : "") +
      (param.id ? "&id=" + param.id : "") +
      (param.status && param.status !== "-1" ? "&status=" + param.status : "") +
      (param.gender ? "&gender=" + param.gender : "") +
      (param.subjectId ? "&subjectId=" + param.subjectId : "") +
      (param.role ? "&role=" + param.role : "") +
      (param.currentCourseId
        ? "&currentCourseId=" + param.currentCourseId
        : "");

    console.log(parameters);

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.notification + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  count() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", strins.api.notification.COUNT, {})
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
        .requestApi("delete", constants.api.notification + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
