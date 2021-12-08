module.exports = {
  api: {
    courses: {
      SEARCH: "/courses",
      UPDATE: "/courses",
      DELETE: "/courses",
    },
    program: {
      SEARCH: "/program",
      UPDATE: "/program",
      DELETE: "/program",
    },
    subjects: {
      SEARCH: "/subjects",
      UPDATE: "/subjects",
      DELETE: "/subjects",
    },
    class: {
      SEARCH: "/class",
      UPDATE: "/class/",
      DELETE: "/class",
    },
    place: {
      SEARCH: "/place",
      UPDATE: "/place/",
      DELETE: "/place",
    },
    users: {
      SEARCH: "/users",
      UPDATE: "/users/",
      DELETE: "/users/",
      APPROVE_TEACHER: "/users/admin-approve-teacher/",
      UPLOAD_AVATAR: "/users/upload-avatar",
      CHANGE_PASSWORD: "/users/change-password",
      LOGIN: "/users/login",
    },
    register: {
      REGISTER_COURSE: "/register",
    },
    healthFacility: {
      SEARCH: "/health-facility",
      UPDATE: "/health-facility/",
      DELETE: "/health-facility",
    },
    schedule: {
      SEARCH: "/schedule",
      UPDATE: "/schedule/",
      DELETE: "/schedule/",
      COUNT_CHANGE_SCHEDULE: "/schedule/count-change-schedule",
      FIND_ALL_CHANGE: "/schedule/find-all-change-schedule",
      CHANGE_SCHEDULE: "/schedule/change-schedule/"
    },
    result: {
      SEARCH: "/result",
      UPDATE: "/result/",
      DELETE: "/result/",
    },
    notification: {
      SEARCH: "/notification",
      UPDATE: "/notification/",
      DELETE: "/notification/",
      COUNT: "/notification/read/count",
    },
  },
};
