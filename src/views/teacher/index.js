// core components
import React from "react";
import Footer from "@containers/Footer";
import Header from "@containers/Header";
import SideBar from "@containers/SideBar";
import { Layout } from "antd";
import { Redirect, Route, Switch } from "react-router-dom";
import CoursePlan from "../admin/course/CoursePlan";
import Notification from "../admin/notification";
import Screen from "../admin/program";
import Profile from "../general/profile";
import Calendar from "../teacher/calendar";
import Class from "../teacher/class";
import ListStudent from "../teacher/listStudent";
import Schedule from "../teacher/schedule";

var routes = [
  // {
  //   path: "/teacher/dashboard",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   navItem: true,
  // },
  {
    path: "/teacher/program",
    name: "Chương trình đào tạo",
    icon: "ni ni-book-bookmark text-blue",
    component: Screen,
    navItem: true,
  },
  {
    path: "/teacher/courses",
    name: "Danh mục khóa học",
    icon: "ni ni-ungroup text-blue",
    component: CoursePlan,
    navItem: true,
  },
  {
    path: "/teacher/class",
    name: "Danh sách các lớp",
    icon: "fas fa-clipboard-list text-blue",
    component: Class,
    navItem: true,
  },
  {
    path: "/teacher/list-student",
    name: "Danh sách sinh viên",
    icon: "fas fa-user-friends text-blue",
    component: ListStudent,
    navItem: false,
  },
  {
    path: "#",
    name: "Công việc",
    icon: "far fa-clock text-blue",
    navItem: true,
    childrens: [
      {
        path: "/teacher/schedule",
        name: "Thời gian biểu",
        icon: "far fa-list-alt text-blue",
        component: Schedule,
        navItem: true,
      },
      {
        path: "/teacher/calendar",
        name: "Lịch",
        icon: "ni ni-calendar-grid-58 text-blue",
        component: Calendar,
        navItem: true,
      },
    ],
  },
  {
    path: "/teacher/notification",
    name: "Thông báo",
    icon: "ni ni-bell-55 text-blue",
    component: Notification,
    navItem: true,
  },
  {
    path: "/teacher/user-profile",
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
];

const TeacherLayout = (props) => {
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
  //   return "";
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

export default TeacherLayout;
