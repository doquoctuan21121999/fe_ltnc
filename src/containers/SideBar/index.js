import notificationProvider from "@data-access/notification";
import scheduleProvider from "@data-access/schedule";
import React, { useEffect, useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand } from "reactstrap";
import styled from "styled-components";
import ItemMenu from "./ItemMenu";

const Sider = styled.div`
  background-color: white;
`;

const SideBar = (props) => {
  const { bgColor, routes, logo } = props;
  const [collapseOpen, setCollapseOpen] = useState();
  const [totalNoti, setTotalNoti] = useState();
  const [totalChange, setTotalChange] = useState();

  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
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

  return (
    <Navbar
      className={
        "navbar-sidebar navbar-vertical fixed-left navbar-light bg-white" +
        (collapseOpen ? " navbar-hidden" : "")
      }
      expand="md"
    >
      <div className="scrollbar-container ps ps--active-y">
        <div className="scrollbar-inner">
          <div className="sidenar-header d-flex align-items-center">
            {logo ? (
              <NavbarBrand className="pt-0">
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
          <Collapse navbar>
            <Nav navbar>
              {routes
                .filter((route) => route.navItem)
                .map((prop, key) => {
                  return (
                    <ItemMenu
                      key={key}
                      totalNoti={totalNoti}
                      totalChange={totalChange}
                      item={prop}
                      hidden={collapseOpen}
                    />
                  );
                })}
            </Nav>
          </Collapse>
        </div>
      </div>
    </Navbar>
  );
};

export default SideBar;
