module.exports = {
  action: {
    action_user_login: "ACTION_USER_LOGIN",
    action_user_logout: "ACTION_USER_LOGOUT",
    action_user_user_email: "ACTION_USER_USER_EMAIL",
  },
  role: {
    admin: "ROLE_ADMIN",
    teacher: "ROLE_TEACHER",
    student: "ROLE_STUDENT",
  },
  roles: {
    admin: {
      name: "Quản lý",
      value: "ADMIN",
      color: "danger",
    },
    teacher: {
      name: "Giảng viên",
      value: "TEACHER",
      color: "success",
    },
    student: {
      name: "Sinh viên",
      value: "STUDENT",
      color: "primary",
    },
  },
  api: {
    courses: "/courses",
    program: "/program",
    subjects: "/subjects",
    class: "/class",
    place: "/place",
    users: "/users",
    approveTeacher: "/users/admin-approve-teacher/",
    registerCourse: "/register",
    healthFacility: "/health-facility",
    schedule: "/schedule",
    sessionSchedule: "/session-schedule",
    result: "/result",
    enterPoint: "/result/enter-point",
    enterListPoint: "/result/enter-list-point",
    listPoints: "/courses/get-points",
    notification: "/notification",
    uploadImage: "/users/upload-avatar",
    changePass: "/users/change-password",
    classPoint: "/class-point",
    dashboard: "/dashboard/thong-ke-so-luong-dang-ky",
  },
  courseRegister: {
    status: {
      new: "Mới thêm",
      ok: "Thành công",
    },
  },
  courseStatus: {
    plan: {
      id: 1,
      name: "Thời gian đăng ký",
      color: "primary",
      value: 1,
    },
    studying: {
      id: 2,
      name: "Đang học",
      color: "success",
      value: 2,
    },
    done: {
      id: 3,
      name: "Hoàn thành",
      color: "warning",
      value: 3,
    },
    cancel: {
      id: 4,
      name: "Bị hủy",
      color: "danger",
      value: 4,
    },
  },
  courseStatusOptions: [
    {
      id: 1,
      name: "Thời gian đăng ký",
      color: "var(--blue)",
      value: 1,
    },
    {
      id: 2,
      name: "Đang học",
      color: "var(--green)",
      value: 2,
    },
    {
      id: 3,
      name: "Hoàn thành",
      color: "var(--red)",
      value: 3,
    },
  ],
  kip: {
    kip1: {
      name: "07:00 - 09:00",
      value: 1,
    },
    kip2: {
      name: "09:00 - 11:00",
      value: 2,
    },
    kip3: {
      name: "12:00 - 15:00",
      value: 3,
    },
    kip4: {
      name: "15:00 - 17:00",
      value: 4,
    },
  },
  gender: {
    nam: {
      label: "Nam",
      value: "NAM",
    },
    nu: {
      label: "Nữ",
      value: "NU",
    },
  },
  statusRegister: {
    registerDone: {
      name: "Đăng ký thành công",
      value: "REGISTER_DONED",
    },
    studying: {
      name: "Đang học",
      value: "STUDYING",
    },
    wait: {
      name: "Chưa nhập điểm",
      value: "STUDYING",
    },
    done: {
      name: "Hoàn thành",
      value: "DONED",
    },
    fail: {
      name: "Trượt",
      value: "FAIL",
    },
  },
  statusRegisterOption: [
    {
      name: "Đăng ký thành công",
      value: "REGISTER_DONED",
      color: "var(--blue)",
      className: "w100",
    },
    {
      name: "Đang học",
      value: "STUDYING",
      color: "var(--green)",
      className: "w100",
    },
    {
      name: "Chưa nhập điểm",
      value: "WAIT_TEACHER",
      color: "var(--yellow)",
      className: "w100",
    },
    {
      name: "Hoàn thành",
      value: "DONED",
      color: "var(--green)",
      className: "w100",
    },
    {
      name: "Trượt",
      value: "FAIL",
      color: "var(--red)",
      className: "w100",
    },
  ],
  // statusAdminResult:{

  // },
  statusAccout: {
    lock: {
      value: 1,
      name: "Khóa",
    },
    active: {
      value: 0,
      name: "Hoạt động",
    },
  },
  day: [
    { label: "Chủ nhật", value: 7, enName: "Sunday" },
    { label: "Thứ 2", value: 1, enName: "Monday" },
    { label: "Thứ 3", value: 2, enName: "Tuesday" },
    { label: "Thứ 4", value: 3, enName: "Wednesday" },
    { label: "Thứ 5", value: 4, enName: "Thursday" },
    { label: "Thứ 6", value: 5, enName: "Friday" },
    { label: "Thứ 7", value: 6, enName: "Saturday" },
  ],
  kipOption: [
    { label: "07:00 - 09:00", value: 1 },
    { label: "09:00 - 11:00", value: 2 },
    { label: "12:00 - 15:00", value: 3 },
    { label: "15:00 - 17:00", value: 4 },
  ],
  genderOption: [
    { label: "Nam", value: "NAM" },
    { label: "Nữ", value: "NU" },
  ],
};
