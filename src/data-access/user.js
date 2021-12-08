import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getBody({
    id,
    fullName,
    age,
    gender,
    address,
    phoneNumber,
    email,
    username,
    password,
    avatar,
    birth,
    cmnd,
    role,
    status,
  }) {
    return {
      id,
      fullName,
      age,
      gender,
      address,
      phoneNumber,
      email,
      username,
      password,
      avatar,
      birth,
      cmnd,
      role,
      status,
    };
  },
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
        .requestApi("get", constants.api.users + parameters, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  create(data) {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.users, data)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  update(id, data) {
    const body = this.getBody(data);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.users + "/" + id, body)
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
        .requestApi("delete", constants.api.users + "/" + id, {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  resetPassword(data) {
    const body = this.getBody(data);
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.users + "/reset-password", body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  approveTeacher(id, data) {
    let body = { subjectsId: data };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("put", constants.api.approveTeacher + id, body)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  profile() {
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("get", constants.api.users + "/profile", {})
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  importUsers(form) {
    return new Promise((resolve, reject) => {
      clientUtils
        .upload("post", constants.api.users + "/import", form)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  // downloadTemplate() {
  //   return new Promise((resolve, reject) => {
  //     clientUtils
  //       .upload("get", "uploads/temmplate.xlsx", {})
  //       .then((x) => {
  //         resolve(x);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
};
