import constants from "@utils/const";
import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import clientUtil from "@utils/client-utils";
import { Head, ItemMenu } from "./styled";

const HeadPage = ({ currentUser }) => {
  const [state, setState] = useState({ showTooltip: false });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: constants.action.action_user_logout,
      value: {},
    });
    localStorage.removeItem("_access");
    window.location.href = "/login";
  };

  console.log(currentUser);

  const menu = (
    <Menu>
      <ItemMenu>
        <Link
          to={
            currentUser.role === constants.role.admin
              ? "/admin/user-profile"
              : currentUser.role === constants.role.teacher
              ? "/teacher/user-profile"
              : "/student/user-profile"
          }
        >
          <i className="ni ni-single-02" />
          <span>Thông tin cá nhân</span>
        </Link>
      </ItemMenu>
      <ItemMenu>
        <Link
          to={
            currentUser.role === constants.role.admin
              ? "/admin/user-profile"
              : currentUser.role === constants.role.teacher
              ? "/teacher/user-profile"
              : "/student/user-profile"
          }
        >
          <i className="ni ni-settings-gear-65" />
          <span>Đổi mật khẩu</span>
        </Link>
      </ItemMenu>
      <Menu.Divider style={{ height: "2px" }} />
      <ItemMenu>
        <Link to="#" onClick={(e) => handleLogout()}>
          <i className="ni ni-user-run" />
          <span>Đăng xuất</span>
        </Link>
      </ItemMenu>
    </Menu>
  );
  return (
    <Head>
      <Breadcrumb />
      <div className="box-user-info">
        <div className="name">
          <div className="fullname">{currentUser.full_name}</div>
          <div className="username">{currentUser.username}</div>
        </div>
        <div>
          <div>
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <img
                onClick={() => setState({ showTooltip: !state.showTooltip })}
                className="avatar pointer"
                src={clientUtil.serverApi + "/images/" + currentUser.avatar}
                width="60px"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </Head>
  );
};

export default connect((state) => {
  return {
    currentUser: state.auth.currentUser,
  };
})(HeadPage);
