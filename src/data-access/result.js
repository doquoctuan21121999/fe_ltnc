import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getBody(data) {
    console.log(data);
    const { midPoint, endPoint, muster, id, classId, subjectId, registerId } =
      data;
    return {
      midPoint,
      endPoint,
      muster,
      studentId: id,
      courseId: classId,
      subjectId,
      registerId,
    };
  },
  search(param = {}) {
    const parameters =
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.registerId ? "&registerId=" + param.registerId : "") +
      (param.courseId ? "&courseId=" + param.courseId : "") +
      (param.subjectId ? "&subjectId=" + param.subjectId : "") +
      (param.studentId ? "&studentId=" + param.studentId : "");
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.result + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getResult(param = {}) {
    // student see result
    const parameters =
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.registerId ? "&registerId=" + param.registerId : "") +
      (param.courseId ? "&courseId=" + param.courseId : "");
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "get",
          constants.api.result + "/get-result" + parameters,
          {}
        )
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  attendance(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.result + "/attendance/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  enterPoint(data) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.enterPoint, data)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  enterListPoint(data) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.enterListPoint, data)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDetail(id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.result + "/" + id)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getPoints(courseId, subjectId) {
    const parameters =
      (courseId ? "?courseId=" + courseId : "") +
      (subjectId ? "&subjectId=" + subjectId : "");
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.listPoints + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
