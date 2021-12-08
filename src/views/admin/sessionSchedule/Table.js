import React from "react";
import PropTypes from "prop-types";
import { Table, Tooltip } from "antd";
import EditOutlined from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlined from "@material-ui/icons/DeleteForeverOutlined";

const TableSession = ({
  dataSource = [],
  handleDelete = () => {},
  handleUpdate = () => {},
}) => {
  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      key: "STT",
      width: 50,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Bắt đầu</div>
        </div>
      ),
    //   sorter: (a, b) => a - b,
      dataIndex: "startTime",
      key: "startTime",
      //   width: "50%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Kết thúc</div>
        </div>
      ),
      //   width: "10%",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tiện ích</div>
        </div>
      ),
      width: "15%",
      dataIndex: "id",
      key: "setting",
      render(id, data, index) {
        return (
          <>
            <Tooltip title="Chỉnh sửa">
              <EditOutlined
                className="text-blue pointer"
                onClick={() => handleUpdate(id, data, index)}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteForeverOutlined
                className="text-red pointer"
                onClick={() => handleDelete(id, data, index)}
              />
            </Tooltip>
          </>
        );
      },
    },
  ];

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={dataSource}
    ></Table>
  );
};

export default TableSession;
