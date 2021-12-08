import courseProvider from "@data-access/course";
import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";

const TableSubject = ({ dataSource }) => {
  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      key: "STT",
      width: "5%",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã môn</div>
        </div>
      ),
      dataIndex: "code",
      key: "code",
      width: "10%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
        </div>
      ),
      width: "40%",
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trạng thái</div>
        </div>
      ),
      dataIndex: "hasScheduled",
      key: "hasScheduled",
      width: "20%",
      render: (item) => (item ? "Đã xếp" : "Chưa xếp lịch"),
    },
  ];

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "auto", y: 250 }}
      pagination={false}
    />
  );
};

export default TableSubject;
