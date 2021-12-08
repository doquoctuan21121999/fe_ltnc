import courseProvider from "@data-access/course";
import { Table as TB, Tabs } from "antd";
import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Table = styled(TB)`
  border-collapse: separate;
  padding-bottom: 20px;
  th {
    text-align: center !important;
  }
  td {
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  td:last-child {
    border-right: 1px solid #ddd;
  }
  tr:last-child {
    td {
      border-bottom: 1px solid #ddd;
    }
  }
`;

const WeekSchedule = ({ start, end, listTime }) => {
  const columns = [
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
    "Chủ nhật",
  ].map((item) => {
    return {
      title: (
        <div style={{ color: "var(--blue-9)" }}>
          {item}
          {/* <div className="title-box"></div> */}
        </div>
      ),
      key: "STT",
      width: "14.29%",
    };
  });

  return (
    <Table
      className="custom-table"
      columns={columns}
      dataSource={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
      pagination={false}
    />
  );
};

export default WeekSchedule;
