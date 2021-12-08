// core components
import courseProvider from "@data-access/course";
import { Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Point = ({ handleSelectCourse, dataSource = [], search = () => {}, detailId }) => {
  const [state, setState] = useState({
    params: {
      page: 0,
      size: 10,
      status: 3,
    },
  });

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
      width: "6%",
      render: (_, __, index) => {
        return index + 1 + state.params.size * state.params.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã khóa</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="address" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "programInfo",
      key: "code",
      width: "10%",
      render: (item) => {
        return item.code;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên khóa</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "programInfo",
      key: "name",
      width: "30%",
      render: (item) => {
        return item.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Đợt</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "semester",
      key: "semester",
      width: "10%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số lượng</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "numberRegister",
      key: "numberRegister",
      width: "10%",
    },
  ];
  return (
    <Table
      className="custom-table"
      dataSource={dataSource}
      rowClassName={(record) => record.id === detailId ? "active pointer" : "pointer"}
      onRow={(record) => {
        return {
          onClick: () => {
            handleSelectCourse(record.id);
          },
        };
      }}
      scroll={{ x: "50%", y: 300 }}
      rowKey={(record) => record.id}
      columns={columns}
      footer={null}
    ></Table>
  );
};

export default connect((state) => {
  return {};
})(Point);
