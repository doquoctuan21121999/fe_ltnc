import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Bread = styled.div`
  display: flex;
  i {
    color: var(--blue-5);
    margin-top: 3px;
    margin-right: 10px;
    font-size: 20px;
  }
`;

const Breadcrumb = (props) => {
  const [state, setState] = useState({});
  const param = useParams();

  useEffect(() => {
    const url = window.location.pathname;
    let item = {};
    switch (url) {
      case "/admin/dashboard":
        item = {
          icon: "ni ni-chart-pie-35",
          title: "Thống kê",
        };
        break;

      case "/admin/program":
        item = {
          icon: "ni ni-book-bookmark text-blue",
          title: "Chương trình đào tạo",
        };
        break;
      case "/teacher/program":
        item = {
          icon: "ni ni-book-bookmark",
          title: "Chương trình đào tạo",
        };
        break;
      case "/admin/program":
        item = {
          icon: "ni ni-book-bookmark",
          title: "Chương trình đào tạo",
        };
        break;

      case "/admin/courses-plan":
        item = {
          icon: "ni ni-air-baloon text-indigo",
          title: "Khóa học dự kiến",
        };
        break;

      case "/student/courses":
        item = {
          icon: "ni ni-air-baloon text-indigo",
          title: "Khóa học dự kiến",
        };
        break;

      case "/admin/courses-studying":
        item = {
          icon: "ni ni-button-play text-blue",
          title: "Khóa học đang học",
        };
        break;

      case "/teacher/courses":
        item = {
          icon: "ni ni-button-play text-blue",
          title: "Khóa học đang học",
        };
        break;

      case "/admin/courses-done":
        item = {
          icon: "ni ni-check-bold text-success",
          title: "Khóa học hoàn thành",
        };
        break;

      case "/admin/subjects":
        item = {
          icon: "ni ni-archive-2 text-primary",
          title: "Môn học",
        };
        break;

      case "/admin/places":
        item = {
          icon: "ni ni-square-pin text-primary",
          title: "Địa điểm",
        };
        break;

      case "/admin/health-facility":
        item = {
          icon: "far fa-hospital text-primary",
          title: "Cơ sở đào tạo",
        };
        break;
      case "/admin/user":
        item = {
          icon: "ni ni-circle-08 text-indigo",
          title: "Quản lý tài khoản",
        };
        break;
      case "/admin/notification":
        item = {
          icon: "ni ni-bell-55 text-red",
          title: "Thông báo",
        };
        break;
      case "/teacher/class":
        item = {
          icon: "fas fa-clipboard-list",
          title: "Danh sách lớp",
        };
        break;
      case "/teacher/schedule":
        item = {
          icon: "far fa-list-alt",
          title: "Thời khóa biểu",
        };
        break;
      case "/teacher/calendar":
        item = {
          icon: "ni ni-calendar-grid-58 text-blue",
          title: "Lịch",
        };
        break;

      case "/student/schedule-student":
        item = {
          icon: "far fa-list-alt",
          title: "Thời khóa biểu",
        };
        break;
      case "/student/calendar":
        item = {
          icon: "ni ni-calendar-grid-58 text-blue",
          title: "Lịch",
        };
        break;

      case "/student/notification":
        item = {
          icon: "ni ni-bell-55",
          title: "Thông báo",
        };
        break;
      case "/teacher/notification":
        item = {
          icon: "ni ni-bell-55",
          title: "Thông báo",
        };
        break;
      case "/admin/schedule":
        item = {
          icon: "ni ni-calendar-grid-58",
          title: "Xếp lịch",
        };
        break;

      case "/student/register-course":
        item = {
          icon: "ni ni-cart text-blue",
          title: "Đăng ký khóa học",
        };
        break;
      case "/student/has-register":
        item = {
          icon: "ni ni-cart text-blue",
          title: "Danh sách đăng ký",
        };
        break;
      case "/student/result":
        item = {
          icon: "ni ni-single-copy-04 text-blue",
          title: "Kết quả học tập",
        };
        break;
      case "/admin/points":
        item = {
          icon: "ni ni-single-copy-04 text-blue",
          title: "Bảng điểm sinh viên",
        };
        break;
      case "/teacher/list-student":
        item = {
          icon: "ni ni-single-copy-04 text-blue",
          title: "Nhập điểm",
        };
        break;
    }

    setState({ url, item });
  }, [param]);

  return (
    <Bread>
      <i className={state.item ? state.item.icon : ""} />

      <h2>
        <b>{state.item && state.item.title}</b>
      </h2>
    </Bread>
  );
};

export default Breadcrumb;
