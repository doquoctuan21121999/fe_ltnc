const { UrlServer } = require("./client-utils");

const domain = UrlServer();
module.exports = {
    user: {
        login: "/users/login",
    },
    image: domain + "/images/",
    uploadImage: domain + "/users/upload-avatar",
    downloadTemplate: domain + "/uploads/template.xlsx"
};