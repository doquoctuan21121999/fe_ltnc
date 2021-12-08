// core components
import { Content } from "@containers/Content";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import userAction from "@redux/actions/user";
import API from "@utils/api";
import { defaultState } from "@utils/common";
import constants from "@utils/const";
import { Tabs, Tooltip, Button } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import userProvider from "./../../../data-access/user";
import Admin from "./admin";
import UserForm from "./form";
import Teacher from "./teacher";
import TeacherForm from "./teacher-form";
import User from "./user";
const Users = (props) => {
  const [state, setState] = useState(defaultState);
  const timeout = useRef(null);

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
  };

  const showModal = (data, type) => {
    let isCreate = type === "create";
    let isDetail = type === "detail";
    let reload = type === "back" ? !state.reload : state.reload;

    setState({
      ...state,
      showModal: !state.showModal,
      dataDetail: data,
      isCreate,
      isDetail,
      reload,
    });
  };

  const loadPage = () => {
    userProvider.search(state.param).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          data: json.data,
          total: json.totalPages,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/auth/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const changeModalTeacher = (data) => {
    let reload = data ? state.reload : !state.reload;
    setState({
      ...state,
      showModalTeacher: !state.showModalTeacher,
      dataDetail: data,
      reload,
    });
  };

  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setState({
        ...state,
        param: { ...state.param, page: 0, [e.target.name]: e.target.value },
      });
      clearTimeout(timeout);
    }, 500);
  };

  const resetPassword = (data) => {
    userProvider.resetPassword(data).then((json) => {
      if (json && json.code === 200) {
        toast.success("Reset mật khẩu thành công");
        loadPage();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const lockAccount = (data, type) => {
    userProvider.update(data.id, { ...data, status: type }).then((json) => {
      if (json && json.code === 200) {
        toast.success(
          data.status === constants.statusAccout.lock.value
            ? "Mở khóa tài khoản thành công"
            : "Khóa tài khoản thành công"
        );

        loadPage();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const handleDelete = (id) => {
    userProvider.delete(id).then((json) => {
      console.log(json);
      if (json && json.code === 200) {
        toast.success("Xóa thành công");
        loadPage();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const handleSubmitFile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("dong", 1);
    formData.append("sheet", 1);

    userProvider.importUsers(formData).then((json) => {
      if (json.code === 200) {
        console.log(json.data);
        setState({ ...state, data: { ...state.data, avatar: json.data } });
        toast.success("import thành công");
      } else {
        toast.error(json.message);
      }
    });
  };

  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 60,
      render: (_, __, index) => {
        return index + 1 + state.param.size * state.param.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">ID Tài khoản</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="id" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 120,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Họ và tên</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="fullName" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "fullName",
      key: "fullName",
      fixed: "left",
      width: 250,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên đăng nhập</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="username" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "username",
      key: "username",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trạng thái</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="status" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "status",
      key: "status",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Giới tính</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="gender" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "gender",
      key: "gender",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày sinh</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="birth"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "birth",
      key: "birth",
      width: 200,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số CMND</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="cmnd"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "cmnd",
      key: "cmnd",
      width: 200,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tuổi</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="age" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "age",
      key: "age",
      width: 120,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Địa chỉ</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="address" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số điện thoại</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                name="phoneNumber"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Email</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="email" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "email",
      key: "email",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày tạo</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày sửa</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 150,
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tiện ích</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "tienIch",
      key: "tienIch",
      fixed: "right",
      width: 120,
      render(_, data) {
        return (
          <div>
            <Tooltip title="Chi tiết">
              <DescriptionOutlinedIcon
                onClick={() => showModal(data, "detail")}
                className="pointer"
                color="primary"
              />
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
              <EditOutlinedIcon
                color="primary"
                className="pointer"
                onClick={() => showModal(data, "update")}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteForeverOutlinedIcon
                color="error"
                className="pointer"
                onClick={() => handleDelete(data.id, "delete")}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <Content>
      <div className="content">
        <Tabs
          type="card"
          tabBarExtraContent={
            <div>
              <input
                className="i_f"
                name="fileImport"
                id="fileImport"
                type="file"
                style={{ display: "none" }}
                defaultValue=""
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={(event) => handleSubmitFile(event)}
              ></input>
              <Button
                htmlFor="file"
                className="btn-sm mr-2 bg-blue"
                type="primary"
                onClick={() => document.getElementById("fileImport").click()}
              >
                Import
              </Button>
              <Button
                href={API.downloadTemplate}
                download
                className="btn-sm mr-2 bg-orange"
                type="primary"
              >
                Download mẫu
              </Button>
              <Button
                className="btn-sm bg-green"
                type="primary"
                onClick={() => showModal({}, "create")}
              >
                Thêm mới
              </Button>
            </div>
          }
        >
          <Tabs.TabPane className="pb-3" tab="Quản lý" key="0">
            <Admin></Admin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Giảng viên" key="1">
            <Teacher></Teacher>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Sinh viên" key="2">
            <User></User>
          </Tabs.TabPane>
        </Tabs>
      </div>
      {state.showModal && (
        <UserForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          index={state.indexDetail}
          isCreate={state.isCreate}
          isDetail={state.isDetail}
        ></UserForm>
      )}
      {state.showModalTeacher && (
        <TeacherForm
          eventBack={() => changeModalTeacher()}
          data={state.dataDetail}
          isCreate={state.isCreate}
          isDetail={state.isDetail}
        ></TeacherForm>
      )}
    </Content>
  );
};

export default connect(
  (state) => {
    return {
      role: state.auth.currentUser,
      listUsers: state.user.listUsers,
      totalPage: state.user.totalPage,
    };
  },
  {
    getUsers: userAction.getUsers,
  }
)(Users);
