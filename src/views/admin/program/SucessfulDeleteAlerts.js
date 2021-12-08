import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";

const SuccessfulDeleteAlerts = (props) => {
  const { eventBack, submit } = props;

  const popup = ()=>{
      eventBack();
      submit();
  } 
  return (
    <ReactBSAlert
      success
      style={{ display: "block", marginTop: "100px" }}
      title="Xóa thành công!"
      onConfirm={() => popup()}
      onCancel={() => popup()}
      confirmBtnBsStyle="primary"
      confirmBtnText="Trở lại"
      btnSize=""
    >
    </ReactBSAlert>
  );
};

export default SuccessfulDeleteAlerts;
