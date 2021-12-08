import Login from "./views/general/login";
import Register from "./views/general/register";


import RegisterCourse from "./views/student/register";
import Result from "./views/student/result";
import ScheduleUser from "./views/student/schedule";
import ChangePass from "./views/general/changePassword"

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-chart-bar-32 text-primary",
  //   component: Index,
  // },
  // {
  //   path: "/admin/courses",
  //   name: "Danh mục khóa học",
  //   icon: "ni ni-chart-pie-35 text-blue",
  //   component: CoursePlan,
  // },
  // {
  //   path: "/admin/subjects",
  //   name: "Danh mục môn học",
  //   icon: "ni ni-app text-red",
  //   component: Subject,
  // },
  // {
  //   path: "/admin/places",
  //   name: "Danh mục địa điểm",
  //   icon: "ni ni-building text-yellow",
  //   component: Place,
  // },
  // {
  //   path: "/admin/health-facility",
  //   name: "Cơ sở y tế",
  //   icon: "ni ni-planet text-orange",
  //   component: HealthFacility,
  // },
  // {
  //   path: "/admin/schedule",
  //   name: "Xếp lịch",
  //   icon: "ni ni-calendar-grid-58 text-green",
  //   component: ScheduleAdmin,
  // },
  // {
  //   path: "/admin/user",
  //   name: "Quản lý tài khoản",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: User,
  // },
  // {
  //   path: "/admin/register-course",
  //   name: "Đăng ký khóa học",
  //   icon: "ni ni-cart text-danger",
  //   component: RegisterCourse,
  // },
  // {
  //   path: "/admin/schedule-student",
  //   name: "Thời khóa biểu",
  //   icon: "ni ni-calendar-grid-58 text-yellow",
  //   component: ScheduleUser,
  // },
  // {
  //   path: "/admin/result",
  //   name: "Kết quả học tập",
  //   icon: "ni ni-cart text-green",
  //   component: Result,
  // },
  // {
  //   path: "/admin/class",
  //   name: "Danh sách các lớp",
  //   icon: "ni ni-cart text-green",
  //   component: Class,
  // },
  // {
  //   path: "/admin/notification",
  //   name: "Thông báo",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Notification,
  // },
  // {
  //   path: "/admin/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  // },
  // {
  //   path: "/admin/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  // },
  // {
  //   path: "/admin/user-profile",
  //   name: "Thông tin cá nhân",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  // },
  // {
  //   path: "/admin/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  // },
  {
    path: "/auth/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/auth/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/auth/change-password",
    name: "Đổi mật khẩu",
    icon: "ni ni-circle-08 text-pink",
    component: ChangePass,
    layout: "/auth",
  },
  
];
export default routes;
