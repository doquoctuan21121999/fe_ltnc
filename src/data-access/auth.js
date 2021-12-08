import { api } from "../utils/strings";
import clientUtils from "../utils/client-utils";

export default {
  login(username, password) {
    let object = {
      username,
      password,
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", api.users.LOGIN, object)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
