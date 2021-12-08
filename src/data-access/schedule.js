import clientUtils from "../utils/client-utils";
import constants from "../utils/const";
import strings from "../utils/strings";
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getBody(data) {
    console.log(data.id);
    const {
      id,
      day,
      placeId,
      subjectId,
      teacherId,
      courseId,
      kipHoc,
      changeScheduleId,
      dates,
      status,
      reason,
      sessionId,
    } = data;
    return {
      id,
      day,
      placeId,
      subjectId,
      teacherId,
      courseId,
      changeScheduleId,
      kipHoc,
      sessionId,
      status,
      reason,
    };
  },
  search(param) {
    const parameters =
      (param.changeScheduleId
        ? "?changeScheduleId=" + param.changeScheduleId
        : "") +
      (param.page ? "?page=" + param.page : "?page=0") +
      (param.size ? "&size=" + param.size : "&size=10") +
      (param.placeId ? "&placeId=" + param.placeId : "") +
      (param.courseId ? "&courseId=" + param.courseId : "") +
      (param.teacherId ? "&teacherId=" + param.teacherId : "");

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.schedule + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getSchedule() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.schedule + "/get", {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getClass() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.schedule + "/get-class", {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  create(data) {
    const body = this.getBody(data);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.schedule, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  update(data, id) {
    const body = this.getBody(data);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.schedule + "/" + id, body)
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
        .requestApi("delete", constants.api.schedule + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  handleChangeInfo(id, data) {
    const body = {
      ...this.getBody(data),
      deleteId: data.id,
      changeScheduleId: undefined,
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi(
          "put",
          constants.api.schedule + "/handle-change-schedule/" + id,
          body
        )
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  countChange() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", strings.api.schedule.COUNT_CHANGE_SCHEDULE, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  findAllChange() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", strings.api.schedule.FIND_ALL_CHANGE, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  changeSchedule(id, data) {
    const body = this.getBody(data);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", strings.api.schedule.CHANGE_SCHEDULE + id, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
