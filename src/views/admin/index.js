// core components
import Footer from "@containers/Footer";
import Header from "@containers/Header";
import SideBar from "@containers/SideBar";
import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Program from "../../views/admin/program";
import Profile from "../../views/general/profile";
import CourseDone from "./course/CourseDone";
import CoursePlan from "./course/CoursePlan";
import CourseStudying from "./course/CourseStudying";
import CourseCancel from "./course/CourseCancel";
import Dashboard from "./dashboard";
import HealthFacility from "./facility";
import Notification from "./notification";
import Place from "./place";
import Point from "./points";
import Result from "./result";
import ScheduleAdmin from "./schedule";
import Subject from "./subject";
import User from "./user";
import SessionSchedule from "./sessionSchedule";

var routes = [
  {
    navItem: true,
    path: "/admin/dashboard",
    name: "Thống kê",
    icon: "ni ni-chart-pie-35 text-blue",
    component: Dashboard,
  },
  {
    navItem: true,
    path: "/admin/program",
    name: "Chương trình đào tạo",
    icon: "ni ni-book-bookmark text-blue",
    component: Program,
  },
  {
    navItem: true,
    path: "#",
    name: "Khóa học",
    icon: "far fa-clone text-blue",
    childrens: [
      // {
      //   navItem: true,
      //   path: "/admin/courses",
      //   name: "Danh sách",
      //   icon: "ni ni-bullet-list-67 text-primary",
      //   component: Courses,
      // },
      {
        navItem: true,
        path: "/admin/courses-plan",
        name: "Dự kiến",
        icon: "ni ni-air-baloon text-blue",
        component: CoursePlan,
      },
      {
        navItem: true,
        path: "/admin/courses-studying",
        name: "Đang học",
        icon: "ni ni-button-play text-blue",
        component: CourseStudying,
      },
      {
        navItem: true,
        path: "/admin/courses-done",
        name: "Hoàn thành",
        icon: "ni ni-check-bold text-blue",
        component: CourseDone,
      },
      {
        navItem: true,
        path: "/admin/courses-cancel",
        name: "Bị hủy",
        icon: "ni ni-bag-17 text-blue",
        component: CourseCancel,
      },
    ],
  },
  {
    navItem: true,
    path: "#",
    name: "Danh mục",
    icon: "ni ni-folder-17 text-primary",
    childrens: [
      {
        navItem: true,
        path: "/admin/subjects",
        name: "Môn học",
        icon: "ni ni-archive-2 text-primary",
        component: Subject,
      },
      {
        navItem: true,
        path: "/admin/places",
        name: "Địa điểm",
        icon: "ni ni-square-pin text-primary",
        component: Place,
      },
      {
        navItem: true,
        path: "/admin/health-facility",
        name: "Cơ sở đào tạo",
        icon: "far fa-hospital text-primary",
        component: HealthFacility,
      },
    ],
  },
  {
    navItem: true,
    // path: "/admin/schedule",
    name: "Xếp lịch",
    icon: "ni ni-calendar-grid-58 text-primary",
    total: 0,
    // component: ScheduleAdmin,
    childrens: [
      {
        navItem: true,
        path: "/admin/schedule",
        name: "Lịch học",
        icon: "ni ni-bullet-list-67 text-primary",
        // span: () => <Badge color="danger" className="span-noti">123</Badge>,
        component: ScheduleAdmin,
      },
      {
        navItem: true,
        path: "/admin/session-schedule",
        name: "Kíp học",
        icon: "far fa-clock text-blue",
        component: SessionSchedule,
      },
    ],
  },
  {
    navItem: true,
    path: "/admin/points",
    name: "Quản lý điểm",
    icon: "ni ni-book-bookmark text-blue",
    component: Point,
  },
  {
    navItem: true,
    path: "/admin/user",
    name: "Quản lý tài khoản",
    icon: "ni ni-circle-08 text-primary",
    component: User,
  },
  {
    navItem: true,
    path: "/admin/user-profile",
    name: "Thông tin cá nhân",
    icon: "ni ni-single-02 text-primary",
    component: Profile,
  },
  {
    navItem: true,
    path: "/admin/notification",
    name: "Thông báo",
    icon: "ni ni-bell-55 text-primary",
    component: Notification,
  },
  // {
  //   navItem: true,
  //   path: "#",
  //   name: "Thiết lập",
  //   icon: "ni ni-bullet-list-67 text-pink",
  //   childrens: [
  //     {
  //       navItem: true,
  //       path: "/admin/icons",
  //       name: "Icons",
  //       icon: "ni ni-briefcase-24 text-blue",
  //       component: Icons,
  //     },
  //     {
  //       navItem: true,
  //       path: "/admin/tables",
  //       name: "Tables",
  //       icon: "fa fa-table text-red",
  //       component: Tables,
  //     },
  //   ],
  // },
  {
    path: "/admin/results",
    name: "Tables",
    component: Result,
  },

  // {
  // navItem: true,
  // path: "/auth/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  // navItem: true,
  // path: "/auth/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];

const Admin = (props) => {
  // const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  return (
    <>
      <div>
        <SideBar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin",
            imgSrc: require("../../assets/img/images.png").default,
            imgAlt: "...",
          }}
        />
        <Layout>
          <Header />
          <Switch>
            {routes.map((prop, key) => {
              return prop.childrens ? (
                prop.childrens.map((item, key) => (
                  <Route
                    exact
                    path={item.path}
                    component={item.component}
                    key={key}
                  />
                ))
              ) : (
                <Route
                  exact
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
            <Redirect from="*" to="/admin/index" />
          </Switch>
          <Footer></Footer>
        </Layout>
      </div>
    </>
  );
};

export default Admin;
