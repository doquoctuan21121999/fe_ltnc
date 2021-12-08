import { AuditOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import courseProvider from "@data-access/course";
import { Table, Tabs, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getDay, getKipHoc } from "../../../utils/common";

const TableSchedule = ({ dataSource = [], handleDelete, showModal }) => {
  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      key: "STT",
      //   width: "5%",
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
      //   width: "10%",
      render: (_, data) => data?.subjectInfo?.code,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
        </div>
      ),
      //   width: "20%",
      dataIndex: "name",
      key: "name",
      render: (_, data) => data?.subjectInfo?.name,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Thứ</div>
        </div>
      ),
      dataIndex: "day",
      key: "day",
      //   width: "20%",
      render: (item) => getDay(item),
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Thời gian</div>
        </div>
      ),
      dataIndex: "sessionInfo",
      key: "sessionInfo",
      //   width: "20%",
      render: (item) =>
        moment(item.startTime, "HH:mm").format("HH:mm") +
        " - " +
        moment(item.endTime, "HH:mm").format("HH:mm"),
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Giảng viên</div>
        </div>
      ),
      key: "teacher",
      //   width: "20%",
      render: (_, data) => data?.teacher?.fullName,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Địa điểm</div>
        </div>
      ),
      key: "place",
      //   width: "20%",
      render: (_, data) => data?.placeInfo?.address,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tiện ích</div>
        </div>
      ),
      key: "tienIch",
      //   width: "20%",
      render: (_, data) => {
        return (
          <>
            {(data.changeInfo || data.reason) && (
              <Tooltip title={data.reason ? "Lý do hủy" : "xem đổi lịch"}>
                <AuditOutlined
                  className={data.reason ? "text-yellow i" : "text-info i"}
                  onClick={() => showModal(data, "edit")}
                />
              </Tooltip>
            )}
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                className="text-blue i"
                onClick={() => showModal(data, "update")}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteOutlined
                className="text-red i"
                onClick={() => handleDelete(data.id)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  const data = dataSource.sort((a, b) => a.day - b.day);

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={data}
      scroll={{ x: "auto", y: 400 }}
      pagination={false}
    />
  );
};

export default TableSchedule;
