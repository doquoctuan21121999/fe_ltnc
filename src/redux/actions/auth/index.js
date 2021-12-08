import { toast } from "react-toastify";
import authProvider from "@data-access/auth";
import cacheProvider from "@data-access/data-cache";
import constants from "@utils/const";

function updateData(data) {
    return (dispatch) => {
        dispatch({
            type: "AUTH-UPDATE-DATA",
            data: data,
        });
    };
}

function login(username, password) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (!username || !password) {
                toast.error("Tên đăng nhập hoặc mật khẩu chưa nhập");
                return;
            }
            authProvider.login(username, password).then((res) => {
                if (res && res.code === 200) {
                    toast.success("Đăng nhập Thành Công");
                    dispatch(
                        updateData({
                            auth: res.data,
                            detail: null,
                        })
                    );

                    cacheProvider.save("CURRENT_USER", "", res.data);

                    setTimeout(() => {
                        switch (res.data.role) {
                            case constants.role.admin:
                                window.location.href = "/admin/program";
                                return;
                            case constants.role.teacher:
                                window.location.href = "/teacher/program";
                                return;
                            default:
                                {}
                        }
                        window.location.href = "/student/program";
                        resolve(res);
                    }, 500);
                } else if (res.code === 405) {
                    toast.error("Tài khoản đã bị khóa");
                    reject();
                } else {
                    toast.error(res.message);
                    reject();
                }
            });
        });
    };
}

function logout() {
    return (dispatch, getState) => {
        authProvider
            .search({ page: 0, size: 1000 })
            .then((s) => {
                if (s && s.code === 0) {
                    dispatch(
                        updateData({
                            listCourse: s.data,
                        })
                    );
                }
            })
            .catch((e) => {});
    };
}

export default {
    login,
    logout,
    updateData,
};