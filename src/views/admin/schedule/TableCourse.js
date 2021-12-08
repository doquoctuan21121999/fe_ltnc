import courseProvider from "@data-access/course";
import { Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";

const TableCourse = ({
  selectEvent = () => {},
  activeIndex = -1,
  tabActive = -1,
}) => {
  const [coursesRegister, setCourseRegister] = useState([]);
  const [coursesStudying, setCoursesStudying] = useState([]);

  useEffect(() => {
    getCourseRegister();
    getCourseStudying();
  }, []);

  const getCourseRegister = () => {
    courseProvider
      .search({
        page: 0,
        size: 999999,
        scheduled: 1,
        status: 1,
      })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setCourseRegister(json.data);
        }
      });
  };

  const getCourseStudying = () => {
    courseProvider
      .search({
        page: 0,
        size: 999999,
        scheduled: 1,
        status: 2,
      })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setCoursesStudying(json.data);
        }
      });
  };
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
          <div className="title-box">Tên khóa</div>
        </div>
      ),
      key: "name",
      width: "50%",
      render: (_, data) => {
        return data.programInfo?.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Đợt</div>
        </div>
      ),
      width: "10%",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày khai giảng</div>
        </div>
      ),
      dataIndex: "ngayKhaiGiang",
      key: "ngayKhaiGiang",
      width: "20%",
      //   render: (_, data) => {
      //     return data.programInfo?.name;
      //   },
    },
  ];

  return (
    <Tabs>
      <Tabs.TabPane tab="Thời gian đăng ký" key={0}>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={coursesRegister}
          scroll={{ x: "auto", y: 250 }}
          pagination={false}
          rowClassName={(_, index) => {
            if (index === activeIndex && tabActive === 0)
              return "pointer active";
            return "pointer";
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => selectEvent(record, rowIndex, 0), // click row
            };
          }}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Đang học" key={1}>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={coursesStudying}
          scroll={{ x: "auto", y: 250 }}
          pagination={false}
          rowClassName={(_, index) => {
            if (index === activeIndex && tabActive === 1)
              return "pointer active";
            return "pointer";
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => selectEvent(record, rowIndex, 1), // click row
            };
          }}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default TableCourse;
