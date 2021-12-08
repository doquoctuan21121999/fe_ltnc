import React, { useState } from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { Badge, Collapse, NavItem, NavLink } from "reactstrap";

function ItemMenu({ item, totalChange, totalNoti }) {
  const [showCollapse, setShowCollapse] = useState(false);
  return (
    <NavItem>
      {item?.childrens?.length > 0 ? (
        <NavLink
          onClick={() => setShowCollapse(!showCollapse)}
          to="#"
          title={item.name}
          className={
            item.childrens.filter(
              (item) => item.path === window.location.pathname
            ).length > 0
              ? "active"
              : ""
          }
          style={{ position: "relative" }}
        >
          <i className={item.icon}></i>
          {item?.span && <item.span></item.span>}
          <span className="nav-link-text font-weight-bold">{item.name}</span>
          {showCollapse ? (
            <i className="ni ni-bold-down ni-dropdown" />
          ) : (
            <i className="ni ni-bold-right ni-dropdown" />
          )}
        </NavLink>
      ) : (
        <NavLink
          //   onClick={onClick(item)}
          to={item.path}
          title={item.name}
          tag={NavLinkRRD}
          style={{ position: "relative" }}
        >
          <i className={item.icon}></i>
          {item && item.path === "/admin/notification" && (
            <Badge color="danger" className="span-noti">
              {totalNoti}
            </Badge>
          )}
          {item && item.path === "/admin/schedule" && (
            <Badge color="danger" className="span-noti">
              {totalChange}
            </Badge>
          )}
          <span className="nav-link-text font-weight-bold">{item.name}</span>
        </NavLink>
      )}
      {item.childrens ? (
        <Collapse
          isOpen={showCollapse}
          transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`}
        >
          {item.childrens.map((item, index) => {
            return (
              <div key={index} className="navitem-child">
                <NavLink
                  to={item.path}
                  tag={NavLinkRRD}
                  style={{ position: "relative" }}
                >
                  <i className={item.icon} />

                  <span className="nav-link-text font-weight-bold">
                    {item.name}
                  </span>

                  <b className="collapse-sign">
                    {showCollapse ? (
                      <i className="ni ni-left-2" />
                    ) : (
                      <i className="ni ni-left-2" />
                    )}
                  </b>
                </NavLink>
              </div>
            );
          })}
        </Collapse>
      ) : (
        <div></div>
      )}
    </NavItem>
  );
}

export default ItemMenu;
