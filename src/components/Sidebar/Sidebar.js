/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import notificationProvider from "@data-access/notification";
import scheduleProvider from "@data-access/schedule";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useDispatch } from "react-redux";
import ItemMenu from "./ItemMenu";

var ps;

const Sidebar = (props) => {
  const { bgColor, routes, logo } = props;
  const [collapseOpen, setCollapseOpen] = useState();
  const [totalNoti, setTotalNoti] = useState();
  const [totalChange, setTotalChange] = useState();
  
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };

  useEffect(() => {
    notificationProvider.count().then((json) => {
      if (json && json.data && json.code === 200) {
        setTotalNoti(json.data);
      }
    });
    scheduleProvider.countChange().then((json) => {
      if (json && json.data && json.code === 200) {
        setTotalChange(json.data);
      }
    });
  }, []);
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

  
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className={
        "navbar-sidebar navbar-vertical fixed-left navbar-light bg-white" +
        (collapseOpen ? " navbar-hidden" : "")
      }
      expand="md"
      // id="sidenav-main"
    >
      <div className="scrollbar-container ps ps--active-y">
        <div className="scrollbar-inner">
          {/* Toggler */}
          <div className="sidenar-header d-flex align-items-center">
            {logo ? (
              <NavbarBrand className="pt-0" {...navbarBrandProps}>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            ) : null}
            <div className="ml-auto" onClick={() => toggleCollapse()}>
              {collapseOpen ? (
                <i className="ni ni-align-left-2 i-collapse" />
              ) : (
                <i className="ni ni-align-center i-collapse" />
              )}
            </div>
          </div>
          {/* {!collapseOpen ? (
            <Form className="sidebar-search navbar-search navbar-search-light form-inline d-none d-md-flex">
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
            </Form>
          ) : (
            <div className="sidebar-search">
              <i className="fas fa-search" />
            </div>
          )} */}

          {/* Collapse */}
          <Collapse navbar>
            <Nav navbar>
              {routes
                .filter((route) => route.navItem)
                .map((prop, key) => {
                  return (
                    <ItemMenu key={key} totalNoti={totalNoti} totalChange={totalChange} item={prop} hidden={collapseOpen} />
                  );
                })}
            </Nav>
          </Collapse>
        </div>
      </div>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
