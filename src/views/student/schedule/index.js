// core components
import Header from "@components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// reactstrap components
import { Alert, Button, Card, CardHeader, Container, Row } from "reactstrap";
import { Table } from "antd";
import { defaultState, getDay, getKipHoc } from "@utils/common";
import Pagination from "@components/Pagination";
import scheduleProvider from "./../../../data-access/schedule";
import { Screen } from "./styled";
import { Content } from "@containers/Content";

const Result = () => {
  const [state, setState] = useState(defaultState);

  const changePage = (value) => {
    setState({ ...state, page: value });
  };

  const getData = () => {
    scheduleProvider.getSchedule().then((json) => {
      if (json && json.code === 200) {
        const size = parseInt(json.totalElements / state.size) + 1;
        setState({
          ...state,
          dataRender: json.data,
          totalPage: json.totalPages,
          totalElements: json.totalElements,
        });
      } else if (json.code === 401) {
        setState({
          loading: false,
        });
        window.location.href = "/auth/login";
      } else {
        setState({
          loading: false,
        });
        toast.error(json.message);
      }
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>STT</div>,
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 20,
      render: (_, __, index) => {
        return index + 1 + state.param.size * state.param.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã môn</div>
        </div>
      ),
      dataIndex: "subjectCode",
      key: "subjectCode",
      fixed: "left",
      width: 80,
      render: (_, data) => {
        return data.subjectInfo.code;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
        </div>
      ),
      dataIndex: "subjectName",
      key: "subjectName",
      fixed: "left",
      width: 100,
      render: (_, data) => {
        return data.subjectInfo.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
        </div>
      ),
      dataIndex: "subjectName",
      key: "subjectName",
      fixed: "left",
      width: 100,
      render: (_, data) => {
        return data.subjectInfo.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Thứ</div>
        </div>
      ),
      dataIndex: "day",
      key: "day",
      fixed: "left",
      width: 80,
      render: (_, data) => {
        return "Thứ " + (data.day + 1);
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Thời gian</div>
        </div>
      ),
      dataIndex: "time",
      key: "time",
      fixed: "left",
      width: 100,
      render: (_, data) => {
        return getKipHoc(data.kipHoc);
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Giảng viên</div>
        </div>
      ),
      dataIndex: "teacherName",
      key: "teacherName",
      fixed: "left",
      width: 100,
      render: (_, data) => {
        return data.teacher.fullName;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Địa điểm</div>
        </div>
      ),
      dataIndex: "placeName",
      key: "placeName",
      fixed: "left",
      width: 100,
      render: (_, data) => {
        return data.placeInfo.address;
      },
    },
  ];
  return (
    <Content>
      <div className="content">
        <div className="head-content">
          <h3> Thời khóa biểu </h3>
        </div>
        <Table
          className="custom-table"
          dataSource={state.dataRender}
          scroll={{ x: 830, y: "auto" }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
      </div>
      <Pagination
        page={state.page}
        totalPage={state.totalPage}
        changePage={changePage}
      ></Pagination>
    </Content>
  );
};

export default Result;
