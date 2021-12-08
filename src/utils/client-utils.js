export const UrlServer = () => {
  // const userApp = useSelector(state => state.userApp);
  const domain = global.origin;
  const localhost = false;

  switch (domain) {
    case "http://45.13.132.247:3000": // server host
      return "http://45.13.132.247:8082";
    case "http://localhost:3000": // localhost
      return localhost ? "http://localhost:8082" : "http://45.13.132.247:8082";
  }
  return localhost ? "http://localhost:8082" : "http://45.13.132.247:8082";
};

export default {
  auth: "",
  serverApi: UrlServer(),
  requestApi(methodType, url, body) {
    return new Promise((resolve, reject) => {
      if (!body) body = {};
      if (methodType.toLowerCase() !== "get") {
        body = JSON.stringify(body);
      }
      this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.auth,
        },
        body
      )
        .then((s) => {
          s.json()
            .then((val) => {
              if (val.code === 401) {
                localStorage.clear();
                // window.location.href = "/auth/login";
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            // window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };

      if (methodType.toLowerCase() !== "get") {
        fetchParam.body = body;
      }
      return fetch(UrlServer() + url, fetchParam)
        .then((json) => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  upload(methodType, url, form) {
    return new Promise((resolve, reject) => {
      return this.requestFetch(
        methodType,
        url && url.indexOf("http") === 0 ? url : url,
        {
          Authorization: this.auth,
        },
        form
      )
        .then((s) => {
          s.json()
            .then((val) => {
              if (val.code === 401) {
                localStorage.clear();
                window.location.href = "/auth/login";
              }
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            window.location.href = "/auth/login";
          }
          reject(e);
        });
    });
  },
};
