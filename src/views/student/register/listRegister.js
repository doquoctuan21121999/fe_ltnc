// core components
import Pagination from "@components/Pagination";
import { Content } from "@containers/Content";
import courseProvider from "@data-access/course";
import healthFacilityProvider from "@data-access/facility";
import registerCourseProvider from "@data-access/register-course";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import { defaultState, getStatusRegister } from "@utils/common";
import { Badge, Button, Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListRegister = ({ currentUser }) => {
  const [state, setState] = useState(defaultState);
  const [body, setBody] = useState({});
  const [course, setCourse] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);

  const changePage = (value) => {
    setState({ ...state, page: value });
  };

  const getCourse = (id) => {
    courseProvider
      .search({ page: 0, size: 999999, healthFacilityId: id })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setCourse([{ id: -1, name: "-- chọn khóa học --" }, ...json.data]);
        }
      });
  };

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const loadPage = () => {
    registerCourseProvider
      .search({
        page: state.page,
        size: state.size,
        studentId: currentUser.userId,
      })
      .then((json) => {
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
          toast.error(json.message);
        }
      });
    healthFacilityProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200 && json.data) {
        setHealthFacility([
          { id: -1, name: "-- chọn cơ sở y tế --" },
          ...json.data,
        ]);
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const cancelRegister = (id, index) => {
    registerCourseProvider.delete(id).then((res) => {
      if (res && res.code === 200) {
        let newData = Object.assign([], state.data);
        newData.splice(index, 1);
        setState({
          ...state,
          data: newData,
        });
        toast.success("Hủy thành công");
      } else {
        toast.error(res.message);
      }
    });
  };

  const afterSubmit = () => {
    setState({ ...state, showModal: false, reload: !state.reload });
  };

  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
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
          <div className="title-box">Ngày đăng ký</div>
        </div>
      ),
      dataIndex: "createdAt",
      key: "code",
      fixed: "left",
      width: 120,
      render: (item) => {
        return item ? moment(item).format("DD/MM/YYYY") : "";
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên sinh viên</div>
        </div>
      ),
      key: "studentName",
      fixed: "left",
      width: 180,
      render: (_, data) => {
        return data.studentInfo && data.studentInfo.fullName;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã chương trình</div>
        </div>
      ),
      key: "code",
      width: 180,
      render: (_, data) => {
        return (
          data.courseInfo &&
          data.courseInfo.programInfo &&
          data.courseInfo.programInfo.code
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Chương trình đăng kí</div>
        </div>
      ),
      key: "programName",
      width: 250,
      render: (_, data) => {
        return (
          data.courseInfo &&
          data.courseInfo.programInfo &&
          data.courseInfo.programInfo.name
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Đợt</div>
        </div>
      ),
      dataIndex: "semester",
      key: "semester",
      width: 80,
      render: (_, data) => {
        return data.courseInfo && data.courseInfo.semester;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số tiết</div>
        </div>
      ),
      key: "soTiet",
      width: 80,
      render: (_, data) => data.courseInfo?.programInfo?.lesson,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trạng thái</div>
        </div>
      ),
      dataIndex: "status",
      key: "status",
      render: (item) => {
        const obj = getStatusRegister(item);
        return (
          <Badge
            className={obj.className}
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
        </div>
      ),
      dataIndex: "id",
      key: "tienIch",
      fixed: "right",
      width: 120,
      render(item, data, index) {
        return data.courseInfo?.status === 1 ? (
          <div>
            <Tooltip title="hủy đăng ký">
              <BlockOutlinedIcon
                onClick={() => cancelRegister(item, index)}
                className="pointer text-red"
              />
            </Tooltip>
          </div>
        ) : (
          <div></div>
        );
      },
    },
  ];

  return (
    <Content>
      <div className="content">
        <div className="head-content d-flex justify-space-between">
          <div className="">
            <h3>Đăng ký khóa học</h3>
          </div>
          <div>
            <Link to="/student/register-course">
              <Button className="btn-sm" type="primary">
                Đăng ký
              </Button>
            </Link>
          </div>
        </div>
        <Table
          className="custom-table"
          dataSource={state.data}
          scroll={{ x: 830, y: 600 }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
        <Pagination
          page={state.param.page}
          totalPage={state.total}
          changePage={changePage}
        ></Pagination>
      </div>
    </Content>
  );
};

export default connect((state) => {
  return { currentUser: state.auth.currentUser };
})(ListRegister);
