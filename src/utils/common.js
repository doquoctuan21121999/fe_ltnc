import { Badge as Bdg } from "reactstrap";
import { Badge } from "antd";
import constants from "./const";
import moment from "moment";
export const defaultState = {
  loading: true,
  reload: false,
  isShowDetail: false,
  isShowModal: false,
  idDetail: null,
  indexDetail: null,
  dataDetail: null,
  isCreate: true,
  isDetail: false,

  dataRender: null,

  param: { page: 0, size: 10 },
  totalPage: 0,
  totalElements: 0,
  role: "",
};
export function splitParamsUrl(str) {
  let pair = null;
  const data = [];
  const queryParams = str.split("?")[1];
  const params = queryParams.split("&");

  params.forEach((param) => {
    pair = param.split("=");
    data.push({ [pair[0]]: pair[1] });
  });

  return data;
}
export function splitParams() {
  let pair = null;
  const data = {};
  const { search } = window.location;
  if (!search) return {};
  const queryParams = search.split("?")[1];
  const params = queryParams.split("&");

  params.forEach((param) => {
    pair = param.split("=");
    data[pair[0]] = pair[1];
  });

  return data;
}
export function getRole(role) {
  switch (role) {
    case constants.roles.admin.value:
      return constants.roles.admin.name;
    case constants.roles.teacher.value:
      return constants.roles.teacher.name;
    case constants.roles.student.value:
      return constants.roles.student.name;
  }
}
export function getDay(day) {
  return constants.day
    .filter((item) => item.value === day)
    .map((item) => {
      return item.label;
    });
}
export function getKipHoc(kip) {
  return constants.kipOption
    .filter((item) => item.value === kip)
    .map((item) => {
      return item.label;
    });
}
export function getStatusRegister(register) {
  return constants.statusRegisterOption.find((item) => item.value === register);
}
export function getCourseStatus(status) {
  return constants.courseStatusOptions.find((item) => item.value === status);
}
export function getRegisterStatusComponent(status) {
  return constants.statusRegisterOption
    .filter((item) => item.value === status)
    .map((item) => {
      return (
        <Bdg className="badge-dot mr-4">
          <i className={item.color} />
          {item.name}
        </Bdg>
      );
    });
}
export function getRegisterStatus(status) {
  return constants.statusRegisterOption.find((item) => item.value === status);
}
export function combineUrlParams(url = "", params = {}) {
  const keys = Object.keys(params);
  const paramUrl = keys
    .reduce(
      (result, key) =>
        (
          Array.isArray(params[key])
            ? params[key].length > 0
            : params[key] ||
              params[key] === 0 ||
              typeof params[key] === "boolean"
        )
          ? [...result, `${key}=${params[key]}`]
          : [...result],
      []
    )
    .join("&");
  return `${url}?${paramUrl}`;
}
export function convertPrice(money) {
  return new Intl.NumberFormat("de-DE").format(money) + "";
}

export function getStatusUser(type) {
  if (type === 1)
    return {
      className: "w100",
      color: "var(--red)",
      name: "Khóa",
    };
  else
    return {
      className: "w100",
      color: "var(--green)",
      name: "Hoạt động",
    };
}

export function getGenderName(gender) {
  if (gender === constants.gender.nam.value) return constants.gender.nam.label;
  else return constants.gender.nu.label;
}

export function getCourseStatusBadge(status) {
  const item = constants.courseStatusOptions.find((item) => item.id === status);

  return (
    <Badge
      className="w100 text-white pointer "
      style={{ backgroundColor: item.color }}
      count={item.name}
    />
  );
}

Number.prototype.formatPrice = function () {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(this);
};

moment.prototype.dateCount = function () {
  return this < moment()
    ? moment().subtract(this.add(1, "days")).format("DD") + " Ngày trước"
    : this.subtract(moment().add(1, "days")).days() + " Ngày";
};
Date.prototype.dateFromNow = function () {
  const now = new Date();
  const calc = parseInt(
    (this.getTime() - now.getTime()) / (24 * 60 * 60 * 1000) + 1
  );
  return calc < 0 ? -calc + " Ngày trước" : calc + " Ngày";
};
