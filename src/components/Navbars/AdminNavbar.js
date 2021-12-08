import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown,
} from "reactstrap";
import api from "../../utils/api";
import constants from "../../utils/const";

const AdminNavbar = (props) => {
  const { currentUser } = props; //useSelector((state) => state.userApp.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: constants.action.action_user_logout,
      value: {},
    });
    localStorage.removeItem("_access");
    window.location.href = "/login";
    console.log("logout");
  };
  console.log(props);
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <span
            className="h1 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="#"
          >
            {props.brandText}
          </span>
          {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <FormGroup className="mb-0">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fas fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Search" type="text" />
              </InputGroup>
            </FormGroup>
          </Form> */}
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={
                        api.image + currentUser.avatar
                        // require("../../assets/img/theme/team-4-800x800.jpg")
                        //   .default
                      }
                    />
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                      {currentUser.full_name}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem
                  to={
                    currentUser.role === constants.roles.admin.value
                      ? "/admin/user-profile"
                      : currentUser.role === constants.roles.teacher.value
                      ? "/teacher/user-profile"
                      : "/student/user-profile"
                  }
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span>Thông tin cá nhân</span>
                </DropdownItem>
                <DropdownItem to="/auth/change-password" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Đổi mật khẩu</span>
                </DropdownItem>
                {/* <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem> */}
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={(e) => handleLogout()}>
                  <i className="ni ni-user-run" />
                  <span>Đăng xuất</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default connect((state) => {
  return {
    currentUser: state.auth.currentUser,
  };
})(AdminNavbar);
