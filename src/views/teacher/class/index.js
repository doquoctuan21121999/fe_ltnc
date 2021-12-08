import Header from "@components/Headers/Header.js";
import scheduleProvider from "@data-access/schedule";
import GroupIcon from "@material-ui/icons/Group";
import { defaultState } from "@utils/common";
import { Badge, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";
import { Screen } from "./styled";
import { Content } from "@containers/Content";

const Tables = () => {
  const [state, setState] = useState(defaultState);
  useEffect(() => {
    loadPage();
  }, [state.size, state.page]);

  const loadPage = () => {
    scheduleProvider.getClass().then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          dataRender: handleData(json.data),
          totalPage: json.totalPages,
          page: json.pageNumber,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        //   toast.error(json.message);
      }
    });
  };

  const handleData = (data = []) => {
    const dataHandled = [];
    data.forEach((element) => {
      if (
        dataHandled.length === 0 ||
        dataHandled.some(
          (item) =>
            item.subjectId !== element.subjectId ||
            item.courseId !== element.courseId
        )
      )
        dataHandled.push(element);
    });
    console.log(dataHandled);
    return dataHandled.sort((a, b) => b.courseId - a.courseId);
  };
  const showListStudent = (data) => {
    let url = "/teacher/list-student?";
    if (data.courseId) {
      url += "courseId=" + data.courseId;
    }
    if (data.subjectId) {
      url += "&subjectId=" + data.subjectId;
    }
    window.location.href = url;
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
      width: 20,
      render: (_, __, index) => {
        return index + 1 + state.page * 10;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã Khóa</div>
        </div>
      ),
      key: "courseCode",
      width: 50,
      render: (_, data) => {
        return data.codeCourse;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên Khóa</div>
        </div>
      ),
      key: "courseName",
      width: 80,
      render: (_, data) => {
        return data.nameCourse;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã Môn</div>
        </div>
      ),
      key: "subjectCode",
      width: 50,
      render: (_, data, index) => {
        return data.subjectInfo.code;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên Môn</div>
        </div>
      ),
      key: "subjectName",
      width: 150,
      render: (_, data, index) => {
        return data.subjectInfo.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số Lượng</div>
        </div>
      ),
      dataIndex: "stt",
      key: "numberRegister",
      width: 40,
      render: (_, data) => {
        return data.numberRegister ? data.numberRegister : 0;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trạng Thái</div>
        </div>
      ),
      key: "courseStatus",
      width: 80,
      render: (_, data) => {
        return (
          (data.status === 1 && (
            <div style={{ display: "flex" }}>
              <Tooltip title="Dự kiên">
                <Badge status="processing" />
              </Tooltip>
              <span>Dự kiến</span>
            </div>
          )) ||
          (data.status === 2 && (
            <div style={{ display: "flex" }}>
              <Tooltip title="Đang học">
                <Badge status="success" />
              </Tooltip>
              <span>Đang học</span>
            </div>
          )) ||
          (data.status === 3 && (
            <div style={{ display: "flex" }}>
              <Tooltip title="Hoàn thành">
                <Badge status="error" />
              </Tooltip>
              <span>Hoàn thành</span>
            </div>
          )) ||
          (data.status === 0 && (
            <div style={{ display: "flex" }}>
              <Tooltip title="Không xác định">
                <Badge status="default" />
              </Tooltip>
              <span>Không xác định</span>
            </div>
          ))
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Danh Sách</div>
        </div>
      ),
      key: "listStudent",
      width: 50,
      render: (_, data) => {
        return (
          <div className="pointer text-blue">
            <GroupIcon onClick={() => showListStudent(data)} />
          </div>
        );
      },
    },
  ];
  return (
    <Content>
      <div className="content">
        <div className="head-content">
          <h3> Danh sách các lớp </h3>
        </div>
        <Table
          className="custom-table"
          dataSource={state.dataRender}
          scroll={{ x: 830, y: "auto" }}
          rowKey={(record) => record.id}
          rowClassName={() => "pointer"}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => showListStudent(record), // click row
            };
          }}
          columns={columns}
          pagination={false}
          footer={null}
        ></Table>
      </div>
    </Content>
  );
};

export default Tables;
