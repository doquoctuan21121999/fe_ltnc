import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const mapRank = {
  "A+": 10,
  A: 9,
  "B+": 8,
  B: 7,
  "C+": 6,
  C: 5,
  "D+": 4,
  D: 3,
  E: 2,
  F: 1,
  "Chưa nhập điểm": 0,
  Trượt: 11,
  "Hoàn thành": 12,
};
const TableSummary = ({ dataSource = [], type = true }) => {
  console.log(dataSource);
  const handleData = () => {
    const rank = {};
    if (type)
      dataSource.forEach((item) => {
        if (Object.keys(rank).includes(item.rank)) {
          rank[item.rank] = rank[item.rank] + 1;
        } else {
          if (item.rank) rank[item.rank] = 1;
          else rank["Chưa nhập điểm"] = (rank["Chưa nhập điểm"] || 0) + 1;
        }
      });
    else
      dataSource.forEach((item) => {
        if (!item.isPass)
          rank["Chưa nhập điểm"] = (rank["Chưa nhập điểm"] || 0) + 1;
        else if (item.isPass === 1)
          rank["Hoàn thành"] = (rank["Hoàn thành"] || 0) + 1;
        else if (item.isPass === 2) rank["Trượt"] = (rank["Trượt"] || 0) + 1;
      });

    return Object.keys(rank)
      .map((item) => {
        return {
          sort: mapRank[item],
          point: item,
          number: rank[item],
        };
      })
      .sort((a, b) => b.sort - a.sort);
  };

  const data = handleData();
  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      key: "stt",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Loại điểm</div>
        </div>
      ),
      dataIndex: "point",
      key: "point",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số lượng</div>
        </div>
      ),
      dataIndex: "number",
      key: "number",
    },
  ];
  return (
    <Table
      className="custom-table w100"
      dataSource={data}
      columns={columns}
      pagination={false}
    ></Table>
  );
};

export default TableSummary;
