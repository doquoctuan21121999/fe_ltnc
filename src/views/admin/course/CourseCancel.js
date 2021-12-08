// core components
import Pagination from "@components/Pagination";
import { Content } from "@containers/Content";
import courseProvider from "@data-access/course";
import {
  UserOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import courseAction from "@redux/actions/course/plan";
import { defaultState, splitParams } from "@utils/common";
import constants from "@utils/const";
import { Badge, Table, Tooltip, Steps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import CourseForm from "./form";
import "./style.scss";

const CourseCancel = (props) => {
  const { role } = props; //useSelector((state) => state.userApp.currentUser.role);
  const [state, setState] = useState(defaultState);
  const timeout = useRef(null);
  const [modal, setModal] = useState({});

  const selectId = splitParams().id;

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);
  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
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

  const loadPage = () => {
    let params = { ...state.param, status: constants.courseStatus.cancel.value };
    courseProvider.search(params).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          data: json.data,
          total: json.totalPages,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
      }
    });
  };

  const showModal = (data, type) => {
    let isCreate = type === "create";
    let isDetail = type === "detail";
    let isUpdate = type === "update";
    let reload = type === "back" ? !state.reload : state.reload;

    setState({
      ...state,
      dataDetail: data,
      reload,
    });

    setModal({
      isCreate,
      isUpdate,
      isDetail,
    });
  };

  const handleDelete = (id) => {
    courseProvider.delete(id).then((json) => {
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
      width: 60,
      fixed: "left",
      render: (_, __, index) => {
        return index + 1 + state.param.page * state.param.size;
      },
    },

    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã chương trình</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="lesson"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      key: "maChuongTrinh",
      width: 140,
      fixed: "left",
      render: (_, data) => {
        return data.programInfo ? data.programInfo.code : "";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên chương trình</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="name"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      key: "tenChuongTrinh",
      width: 200,
      fixed: "left",
      render: (_, data) => {
        return data.programInfo ? data.programInfo.name : "";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Cơ sở đào tạo</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                name="nameHealthFacility"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      key: "healthFacility",
      width: 150,
      render: (_, data) => {
        return data.healthFacility ? data.healthFacility.name : "";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Đợt</div>
          <div className="addition-box"></div>
        </div>
      ),
      width: 70,
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Học phí</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "price",
      key: "price",
      width: 100,
      render: (_, data) => {
        return data.programInfo.price;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số lượng đăng ký</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "numberRegister",
      key: "numberRegister",
      width: 150,
      render: (number, data) => {
        let bgColor = "var(--blue)";
        if (number === 0) bgColor = "var(--red)";
        if (number === data.limitRegister) bgColor = "var(--green)";

        return (
          <Tooltip title="Xem danh sách sinh viên đăng ký">
            <Badge
              className="w100 text-white pointer "
              onClick={() =>
                (window.location.href = "/admin/results?courseId=" + data.id)
              }
              style={{ backgroundColor: bgColor }}
              count={number + " / " + data.limitRegister}
            ></Badge>
          </Tooltip>
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Giới hạn đăng ký</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "limitRegister",
      key: "limitRegister",
      width: 150,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số tiết</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="lesson"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "lesson",
      key: "lesson",
      width: 100,
      render: (_, data) => {
        return data.programInfo.lesson;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày khai giảng</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "ngayKhaiGiang",
      key: "ngayKhaiGiang",
      width: 150,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày kết thúc</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "ngayKetThuc",
      key: "ngayKetThuc",
      width: 150,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tiện ích</div>
          <div className="addition-box"></div>
        </div>
      ),
      key: "tienIch",
      fixed: "right",
      width: 120,
      render: (_, data) => {
        return (
          <div>
            {role === constants.role.admin ? (
              <>
                <Tooltip title="Chỉnh sửa">
                  <EditOutlinedIcon
                    color="primary"
                    className="pointer"
                    onClick={(e) => showModal(data, "update")}
                  ></EditOutlinedIcon>
                </Tooltip>
                <Tooltip title="Danh sách sinh viên">
                  <GroupOutlinedIcon
                    color="primary"
                    className="pointer"
                    onClick={() =>
                      (window.location.href =
                        "/admin/results?courseId=" + data.id)
                    }
                  ></GroupOutlinedIcon>
                </Tooltip>
                <Tooltip title="Xóa">
                  <DeleteForeverOutlinedIcon
                    color="error"
                    className="pointer"
                    onClick={(e) => handleDelete(data.id)}
                  ></DeleteForeverOutlinedIcon>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Chi tiết">
                <EditOutlinedIcon
                  color="primary"
                  className="pointer"
                  onClick={(e) => showModal(data, "detail")}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Content>
      <div className="content">
        <div className="head-content d-flex justify-space-between">
          <h3>
            <b>Khóa học dự kiến</b>
          </h3>
          <div style={{ width: 1000 }}>
            <Steps>
              <Steps.Step
                status="process"
                title="Dự kiến"
                icon={<SolutionOutlined />}
              />
              <Steps.Step
                status="wait"
                title="Đang học"
                icon={<LoadingOutlined />}
              />
              <Steps.Step
                status="wait"
                title="Hoàn thành"
                icon={<SmileOutlined />}
              />
            </Steps>
          </div>
        </div>
        <Table
          className="custom-table"
          dataSource={state.data}
          scroll={{ x: 830, y: 700 }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>

        <Pagination
          page={state.param.page}
          totalPage={state.totalPage}
          changePage={changePage}
        ></Pagination>
      </div>
      {(modal.isDetail || modal.isUpdate) && (
        <CourseForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          isCreate={modal.isCreate}
          isDetail={modal.isDetail}
        />
      )}
    </Content>
  );
};

export default connect(
  (state) => {
    return {
      role: state.auth.currentUser.role,
      listCourse: state.coursePlan.listCoursePlan,
      totalPage: state.coursePlan.totalPage,
    };
  },
  {
    testCoursePlan: courseAction.updateData,
  }
)(CourseCancel);
