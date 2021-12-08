import { Badge, Table } from "antd";
import React from "react";

const PointTableStudent = ({
  dataSource = [],
  scroll = { x: "auto", y: 400 },
}) => {
  const columns = [
    {
      title: <div style={{ textAlign: "center" }}>STT</div>,
      dataIndex: "stt",
      key: "stt",
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã môn</div>
        </div>
      ),
      dataIndex: "subjectCode",
      key: "subjectCode",
      width: 100,
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
      width: 200,
      render: (_, data) => {
        return data.subjectInfo.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm danh</div>
        </div>
      ),
      dataIndex: "muster",
      key: "muster",
      width: 100,
      render: (item, data) => (
        <Badge
          className="w100"
          style={{ backgroundColor: "var(--blue)" }}
          count={item + " / " + data.subjectInfo?.lesson}
        ></Badge>
      ),
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Giữa kỳ</div>
        </div>
      ),
      dataIndex: "midPoint",
      key: "midPoint",
      width: 100,
      render: (_, data) => {
        return data.midPoint;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Cuối kỳ</div>
        </div>
      ),
      dataIndex: "endPoint",
      key: "endPoint",
      width: 100,
      render: (_, data) => {
        return data.endPoint;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tổng kết</div>
        </div>
      ),
      dataIndex: "total",
      key: "total",
      width: 100,
      render: (_, data) => {
        return data.subjectInfo?.isUsePoint ? (
          data.total ? (
            data.total.toFixed(2)
          ) : null
        ) : (
          <Badge.Ribbon
            className="w100"
            style={{
              backgroundColor: data.isPass ? "var(--green)" : "var(--red)",
              top: "-12px",
              left: "0",
            }}
            text={data.isPass ? "Hoàn thành" : "Trượt"}
          ></Badge.Ribbon>
        );
      },
    },

    {
      title: (
        <div className="custom-header">
          <div className="title-box">Loại điểm</div>
        </div>
      ),
      dataIndex: "rank",
      key: "rank",
      width: 100,
    },
  ];
  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={dataSource}
      rowKey={(r, idx) => idx}
      scroll={scroll}
      pagination={false}
    ></Table>
  );
};

export default PointTableStudent;
