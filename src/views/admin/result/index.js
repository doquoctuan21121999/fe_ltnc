import Header from "@components/Headers/Header.js";
import Pagination from "@components/Pagination";
import courseProvider from "@data-access/course";
import registerProvider from "@data-access/register-course";
import {
  getRegisterStatus,
  splitParamsUrl,
  getCourseStatus,
} from "@utils/common";
import constants from "@utils/const";
import { Title } from "@utils/styled";
import { Badge, Col, Row, Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card } from "reactstrap";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ListPoint from "./Point";
import { Content } from "@containers/Content";

const Result = () => {
  const [state, setState] = useState({
    param: { page: 0, size: 10 },
  });
  const [semesters, setSemester] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});
  useEffect(() => {
    loadPage();
    getListSemester();
    getCourseInfo();
  }, [state.param, state.reload]);
  const { search } = window.location;
  let courseId;
  let semester;
  if (search) {
    const paramStr = splitParamsUrl(search);
    paramStr.forEach((param) => {
      if (param.hasOwnProperty("courseId")) {
        courseId = param.courseId;
      } else if (param.hasOwnProperty("semester")) {
        semester = param.semester;
      }
    });
  }

  const searchSemester = (item) => {
    window.history.replaceState({}, "", "/admin/results?courseId=" + courseId);
    console.log(item);
    setState({
      ...state,
      reload: !state.reload,
    });
  };
  const loadPage = () => {
    registerProvider.search({ courseId: courseId, semester }).then((json) => {
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
        //   toast.error(json.message);
      }
    });
  };

  const getListSemester = () => {
    registerProvider.getSemesters({ courseId: courseId }).then((json) => {
      if (json && json.code === 200 && json.data) {
        let newSemester = json.data.filter((item) => item == semester);
        if (newSemester.length === 0) setSemester([semester, ...json.data]);
        else setSemester(json.data);
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const getCourseInfo = () => {
    courseProvider.getById(courseId).then((res) => {
      if (res && res.code === 200 && res.data) {
        setCourseInfo(res.data);
      }
    });
  };

  const approveResult = (type, data) => {
    let body = {
      id: data.id,
      courseId: data.courseId,
      kind: data.kind,
      semester: data.semester,
      studentId: data.studentId,
      total: data.total,
    };

    if (type) {
      body.status = constants.statusRegister.done.value;
      update(data.id, body);
    } else {
      body.status = constants.statusRegister.fail.value;
      update(data.id, body);
    }
  };
  const update = (id, body) => {
    registerProvider.update(id, body).then((json) => {
      if (json && json.code === 200) {
        setState({ ...state, reload: !state.reload });
        toast.success("Điểm danh thành công");
      } else {
        toast.error("Điểm danh không thành công\n" + json.message);
      }
    });
  };

  const showModal = (data, type) => {
    setState({ ...state, type, dataDetail: data });
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
          <div className="title-box">Mã sinh viên</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="id" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "studentId",
      key: "studentId",
      fixed: "left",
      width: 120,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên sinh viên</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="fullName" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      key: "tenSV",
      fixed: "left",
      width: 250,
      render: (_, data) => {
        return data.studentInfo && data.studentInfo.fullName;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm tổng kết</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="gender" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "total",
      key: "total",
      width: 180,
      render: (item) => {
        return item || "Chưa có";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Xếp loại</div>
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
      dataIndex: "kind",
      key: "kind",
      width: 200,
      render: (item) => {
        return item || "Chưa có";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trạng thái</div>
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
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (item) => {
        const obj = getRegisterStatus(item);
        return (
          <Badge
            className="w100 text-white"
            style={{ backgroundColor: obj.color }}
            count={obj.name}
          ></Badge>
        );
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
            <Tooltip title="Xem bảng điểm">
              <LibraryBooksIcon
                onClick={() => showModal(data, "showPoint")}
                className="pointer"
                color="primary"
              />
            </Tooltip>
            {/* <Tooltip title="Chỉnh sửa">
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
            </Tooltip> */}
          </div>
        );
      },
    },
  ];

  return (
    <Content>
      <div className="content">
        <div className="header d-flex justify-space-between">
          <div className="a">
            <h3>Thông tin khóa học</h3>
          </div>
        </div>
        <div className="title">
          <Row>
            <Col span={6}>
              <label>Mã chương trình</label>
              <p>
                <b>{courseInfo.programInfo && courseInfo.programInfo.code}</b>
              </p>
            </Col>
            <Col span={6}>
              <label>Tên chương trình</label>
              <p>
                <b>{courseInfo.programInfo && courseInfo.programInfo.name}</b>
              </p>
            </Col>
            <Col span={6}>
              <label>Số tiết học</label>
              <p>
                <b>{courseInfo.programInfo && courseInfo.programInfo.lesson}</b>
              </p>
            </Col>
            <Col span={6}>
              <label>Học phí</label>
              <p>
                <b>{courseInfo.programInfo && courseInfo.programInfo.price}</b>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <label>Đợt</label>
              <p>
                <b>{courseInfo.semester}</b>
              </p>
            </Col>
            <Col span={6}>
              <label>Cơ sở đào tạo</label>
              <p>
                <b>
                  {courseInfo.healthFacility && courseInfo.healthFacility.name}
                </b>
              </p>
            </Col>
            <Col span={6}>
              <label>Số lượng đăng ký</label>
              <p>
                <b>
                  {courseInfo.numberRegister + " / " + courseInfo.limitRegister}
                </b>
              </p>
            </Col>
            <Col span={6}>
              <label>Thời gian</label>
              <p>
                <b>
                  {moment(courseInfo.ngayKhaiGiang).format("DD/MM/YYYY") +
                    " - " +
                    moment(courseInfo.ngayKetThuc).format("DD/MM/YYYY")}
                </b>
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <label>Số môn</label>
              <p>
                <b>
                  {courseInfo.programInfo &&
                    courseInfo.programInfo.listSubjects &&
                    courseInfo.programInfo.listSubjects.length}
                </b>
              </p>
            </Col>
            <Col span={12}>
              <label>Trạng thái</label>
              <div>
                {courseInfo.status && (
                  <Badge
                    className="w25 text-white"
                    style={{
                      backgroundColor: getCourseStatus(courseInfo.status).color,
                    }}
                    count={getCourseStatus(courseInfo.status).name}
                  ></Badge>
                )}
              </div>
            </Col>
            <Col span={6}>
              {courseInfo.status === 1 && (
                <>
                  <label>Số ngày đăng ký còn lại</label>
                  <div>
                    {moment(courseInfo.ngayKhaiGiang)
                      .subtract(moment())
                      .format("DD")}
                  </div>
                </>
              )}
              {courseInfo.status === 2 && (
                <>
                  <label>Số ngày học còn lại</label>
                  <div>
                    {moment(courseInfo.ngayKetThuc)
                      .subtract(moment())
                      .format("DD")}
                  </div>
                </>
              )}
            </Col>
          </Row>
        </div>
        <div className="header d-flex justify-space-between">
          <div className="a">
            <h3>Danh sách lớp</h3>
          </div>
        </div>
        <Table
          className="custom-table"
          dataSource={state.data}
          scroll={{ x: 830, y: 650 }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
        <Pagination
          page={state.param.page}
          totalPage={state.total}
          // changePage={changePage}
        ></Pagination>
        {state.type === "showPoint" && (
          <ListPoint
            eventBack={() =>
              setState({ ...state, type: null, dataDetail: null })
            }
          ></ListPoint>
        )}
      </div>
    </Content>
  );
};

export default Result;
