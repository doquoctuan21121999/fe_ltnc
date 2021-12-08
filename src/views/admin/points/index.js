import Pagination from "@components/Pagination";
import { Content } from "@containers/Content";
import courseProvider from "@data-access/course";
import resultProvider from "@data-access/result";
import userProvider from "@data-access/user";
import { Badge, Col, Popover, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import TableCourse from "./TableCourse";

const Point = ({ updateData }) => {
  const [state, _setState] = useState({
    params: {
      page: 0,
      size: 10,
      status: 3,
    },
  });
  const timeout = useRef(null);

  const setState = (attr) => {
    _setState((state) => {
      return { ...state, ...attr };
    });
  };

  useEffect(() => {
    getCourses();
  }, [state.params]);

  const changePage = (value) => {
    setState({ params: { ...state.params, page: value } });
  };

  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setState({
        param: { ...state.params, page: 0, [e.target.name]: e.target.value },
      });
      clearTimeout(timeout);
    }, 500);
  };

  const getCourses = () => {
    courseProvider.search(state.params).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          listCourse: json.data,
          totalCourse: json.totalPages,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ loading: false });
        toast.error(json.message);
      }
    });
  };

  const getResults = (courseId) => {
    resultProvider.getPoints(courseId).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          data: json.data,
          tablePoints: handleListRegisters(json.data),
          courseDetail: json.data.courseInfo,
          // courseDetail: state.listCourse.find((item) => item.id === courseId),
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
      }
    });
  };

  const handleListRegisters = (data) => {
    const { listResult = [], listRegister = [] } = data;
    const tablePoints = [];
    listResult.forEach((item) => {
      const register = listRegister.find(
        (element) => element.id === item.registerId
      );
      register.results = {
        ...(register.results || {}),
        [item.subjectInfo.code]: item,
      };
    });
    return (listRegister || []).map((item) => {
      return {
        id: item.id,
        studentName: item.studentInfo?.fullName,
        studentId: item.studentInfo?.id,
        ...(item.results
          ? Object.keys(item.results).reduce((a, b) => {
              return { ...a, [b]: item.results[b] };
            }, {})
          : []),
      };
    });
  };

  const handleSelectCourse = (courseId) => {
    getResults(courseId);
  };

  const getColumns = () => {
    return (
      state.courseDetail?.programInfo?.listSubjects?.map((item, index) => {
        return {
          title: (
            <div className="custom-header">
              <div className="title-box">{item.name}</div>
              <div className="addition-box"></div>
            </div>
          ),
          key: item.name,
          dataIndex: item.code,
          width: 150,
          render: (item) =>
            item.subjectInfo?.isUsePoint ? (
              <Popover
                content={
                  <div>
                    <label>Điểm danh:</label>
                    <p>
                      <b>{item.muster}</b>
                    </p>
                  </div>
                }
              >
                <span className="pointer">{(item.total || 0).toFixed(2)}</span>
              </Popover>
            ) : (
              <Popover
                content={
                  <div>
                    <label>Điểm danh:</label>
                    <p>
                      <b>{item.muster}</b>
                    </p>
                  </div>
                }
              >
                <Badge
                  className="pointer"
                  style={{
                    width: 120,
                    backgroundColor:
                      item.isPass === 1 ? "var(--green)" : "var(--red)",
                  }}
                  count={item.isPass === 1 ? "Hoàn thành" : "Trượt"}
                ></Badge>
              </Popover>
            ),
        };
      }) || []
    );
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
      width: 50,
      fixed: 'left',
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Sinh viên</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="address" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      key: "name",
      fixed: 'left',
      width: 250,
      render: (_, data) => {
        return data.studentName + " - " + data.studentId;
      },
    },
    ...getColumns(),
  ];

  console.log(state);

  return (
    <Content>
      <div className="content">
        <Row>
          <Col span="12">
            <div className="head-content d-flex justify-space-between">
              <div className="a">
                <h3>Khóa học</h3>
              </div>
            </div>
            <TableCourse
              handleSelectCourse={handleSelectCourse}
              dataSource={state.listCourse}
              detailId={state.courseDetail?.id}
            />
            <Pagination
              page={state.param?.page || 0}
              totalPage={state.totalCourse}
              changePage={changePage}
            ></Pagination>
          </Col>
          <Col span="12">
            <div className="head-content d-flex justify-space-between pl-4">
              <div className="a">
                <h3>Thông tin khóa học</h3>
              </div>
            </div>
            <div className="pl-4">
              <Row>
                <Col span={12}>
                  <label>Tên chương trình đào tạo</label>
                  <p>
                    <b>{state.courseDetail?.programInfo?.name}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Mã chương trình</label>
                  <p>
                    <b>{state.courseDetail?.programInfo?.code}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Số tiết học</label>
                  <p>
                    <b>{state.courseDetail?.programInfo?.lesson}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Học phí</label>
                  <p>
                    <b>{state.courseDetail?.programInfo?.price}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Đợt</label>
                  <p>
                    <b>{state.courseDetail?.programInfo?.numberTurn}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Cơ sở đào tạo</label>
                  <p>
                    <b>{state.courseDetail?.healthFacility?.address}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Số lượng đăng ký</label>
                  <p>
                    <b>{state.courseDetail?.numberRegister}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Số môn</label>
                  <p>
                    <b>
                      {state.courseDetail?.programInfo?.listSubjects?.length}
                    </b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Ngày khai giảng</label>
                  <p>
                    <b>
                      {state.courseDetail &&
                        moment(state.courseDetail?.ngayKhaiGiang).format(
                          "DD/MM/YYYY"
                        )}
                    </b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Kết thúc học kỳ</label>
                  <p>
                    <b>
                      <b>
                        {state.courseDetail &&
                          moment(state.courseDetail?.ngayKetThuc).format(
                            "DD/MM/YYYY"
                          )}
                      </b>
                    </b>
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="head-content d-flex justify-space-between mt-3">
              <div className="a">
                <h3>Bảng điểm</h3>
              </div>
            </div>
            <Table
              className="custom-table"
              dataSource={state.tablePoints || []}
              scroll={{ x: "50%", y: 600 }}
              rowKey={(record) => record.id}
              columns={columns}
              footer={null}
              pagination={false}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default connect((state) => {
  return {
    role: state.auth.currentUser,
  };
})(Point);
