/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink, Button } from "reactstrap";

export const ButtonCollapse = (props) => {
  const { content, icon } = props;
  return (
    <button
      className="btn-collapse btn-success btn"
      color="success"
      type="button"
    >
      <i className={icon}></i>
      <span>{content}</span>
    </button>
  );
};
