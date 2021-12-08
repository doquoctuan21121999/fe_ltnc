import clientUtils from "../utils/client-utils";
import constants from "../utils/const";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  uploadAvatar(form, id) {
    return new Promise((resolve, reject) => {
      clientUtils
        .upload("post", constants.api.uploadImage + "/" + id, form)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  uploadAvatar2(form) {
    return new Promise((resolve, reject) => {
      clientUtils
        .upload("post", constants.api.uploadImage, form)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
