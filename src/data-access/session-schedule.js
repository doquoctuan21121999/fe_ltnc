import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  search({ page = 0, size = 10 }) {
    const parameters = "?page=" + page + "&size=" + size;

    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.sessionSchedule + parameters, {})
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
        .requestApi("post", constants.api.sessionSchedule, body)
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
        .requestApi("put", constants.api.sessionSchedule + "/" + id, body)
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
        .requestApi("delete", constants.api.sessionSchedule + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
