import React, { useState } from "react";
import { NavLink as NavLinkRRD } from "react-router-dom";
import { Badge, Collapse, NavItem, NavLink } from "reactstrap";
function ItemMenu(props) {
  const [showCollapse, setShowCollapse] = useState(false);
  return (
    <NavItem>
      {props.item.childrens && props.item.childrens.length > 0 ? (
        <NavLink
          onClick={() => setShowCollapse(!showCollapse)}
          to="#"
          title={props.item.name}
          className={
            props.item.childrens.filter(
              (item) => item.path === window.location.pathname
            ).length > 0
              ? "active"
              : ""
          }
          style={{ position: "relative" }}
        >
          <i className={props.item.icon}></i>
          {props.item && props.item.span && <props.item.span></props.item.span>}
          <span className="nav-link-text">{props.item.name}</span>
          {showCollapse ? (
            <i className="ni ni-bold-down ni-dropdown" />
          ) : (
            <i className="ni ni-bold-right ni-dropdown" />
          )}
        </NavLink>
      ) : (
        <NavLink
          //   onClick={onClick(props.item)}
          to={props.item.path}
          title={props.item.name}
          tag={NavLinkRRD}
          //   data-filter-tags={props.item.name + " " + props.item.filter}
          style={{ position: "relative" }}
        >
          <i className={props.item.icon}></i>
          {props.item && props.item.path === "/admin/notification" && (
            <Badge color="danger" className="span-noti">
              {props.totalNoti}
            </Badge>
          )}
          {props.item && props.item.path === "/admin/schedule" && (
            <Badge color="danger" className="span-noti">
              {props.totalChange}
            </Badge>
          )}
          <span className="nav-link-text">{props.item.name}</span>
        </NavLink>
      )}
      {props.item.childrens ? (
        <Collapse
          elementType="ul"
          isOpen={showCollapse}
          collapseHeight="0px"
          transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`}
        >
          {props.item.childrens.map((item, index) => {
            return (
              <li key={index} className="navitem-child">
                <NavLink
                  to={item.path}
                  tag={NavLinkRRD}
                  style={{ position: "relative" }}
                >
                  <i className={item.icon}></i>

                  <span className="nav-link-text">{item.name}</span>

                  <b className="collapse-sign">
                    {showCollapse ? (
                      <i className="ni ni-left-2" />
                    ) : (
                      <i className="ni ni-left-2" />
                    )}
                  </b>
                </NavLink>
              </li>
            );
          })}
        </Collapse>
      ) : null}
    </NavItem>
  );
}

export default ItemMenu;
