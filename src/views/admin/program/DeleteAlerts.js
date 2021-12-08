import React from "react";
// react component used to create sweet alerts
import ReactBSAlert from "react-bootstrap-sweetalert";
import programProvider from "./../../../data-access/program";
import { toast } from "react-toastify";

const DeleteAlerts = (props) => {
  const { submit, cancel, id } = props;

  const deleteProgram = () => {
    programProvider.delete(id).then((json) => {
      if (json && json.code === 200) {
        toast.success("Xóa thành công");
        submit();
      } else {
        toast.error(json.message);
        cancel();
      }
    });
  };

  return (
    <ReactBSAlert
      warning
      style={{ display: "block", marginTop: "100px" }}
      title="Bạn có chắc xóa chương trình?"
      onConfirm={() => cancel()}
      onCancel={() => deleteProgram()}
      showCancel
      confirmBtnBsStyle="secondary"
      confirmBtnText="Trở về"
      cancelBtnBsStyle="danger"
      cancelBtnText="Đồng ý, xóa!"
      btnSize=""
    ></ReactBSAlert>
  );
};

export default DeleteAlerts;
