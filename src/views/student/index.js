import Footer from "@containers/Footer";
import Header from "@containers/Header";
import SideBar from "@containers/SideBar";
import { Layout } from "antd";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import CoursePlan from "../admin/course/CoursePlan";
import Notification from "../admin/notification";
import Program from "../admin/program";
import Profile from "../general/profile";
import RegisterCourse from "../student/register";
import Result from "../student/result";
import ScheduleUser from "../student/schedule";
import CalendarStudent from "../student/schedule/calendar";
import ListRegister from "./register/listRegister";

var routes = [
  // {
  //   path: "/student/dashboard",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   navItem: true,
  // },
  {
    path: "/student/program",
    name: "Chương trình đào tạo",
    icon: "ni ni-book-bookmark text-blue",
    component: Program,
    navItem: true,
  },
  {
    path: "/student/courses",
    name: "Danh mục khóa học",
    icon: "ni ni-ungroup text-blue",
    component: CoursePlan,
    navItem: true,
  },
  {
    path: "/student/register-course",
    name: "Đăng ký khóa học",
    icon: "ni ni-cart text-blue",
    component: RegisterCourse,
    navItem: true,
  },
  {
    path: "/student/has-register",
    name: "Danh sách đăng ký",
    icon: "ni ni-cart text-blue",
    component: ListRegister,
    navItem: false,
  },
  {
    path: "#",
    name: "Thời khóa biểu",
    icon: "far fa-clock text-blue",
    navItem: true,
    childrens: [
      {
        navItem: true,
        path: "/student/schedule-student",
        name: "Danh sách",
        icon: "far fa-list-alt text-blue",
        component: ScheduleUser,
      },
      {
        path: "/student/calendar",
        name: "Lịch",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: CalendarStudent,
        navItem: true,
      },
    ],
  },
  {
    path: "/student/result",
    name: "Kết quả học tập",
    icon: "ni ni-single-copy-04 text-blue",
    component: Result,
    navItem: true,
  },
  {
    path: "/student/notification",
    name: "Thông báo",
    icon: "ni ni-bell-55 text-blue",
    component: Notification,
    navItem: true,
  },
  {
    path: "/student/user-profile",
    name: "Thông tin cá nhân",
    icon: "ni ni-single-02 text-blue",
    component: Profile,
    navItem: true,
  },
  // {
  //   path: "/auth/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth",
  // },
  // {
  //   path: "/auth/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth",
  // },
];

const StudentLayout = (props) => {
  // const mainContent = React.useRef(null);
  // const location = useLocation();

  // React.useEffect(() => {
  //   document.documentElement.scrollTop = 0;
  //   document.scrollingElement.scrollTop = 0;
  //   mainContent.current.scrollTop = 0;
  // }, [location]);

  // const getBrandText = (path) => {
  //   for (let i = 0; i < routes.length; i++) {
  //     if (props.location.pathname.indexOf(routes[i].path) !== -1) {
  //       return routes[i].name;
  //     }
  //   }
  //   return "Brand";
  // };

  return (
    <>
      <div>
        <SideBar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin",
            imgSrc: require("../../assets/img/brand/logo-isoft.png").default,
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

export default StudentLayout;
