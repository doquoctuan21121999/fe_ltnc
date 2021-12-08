import programProvider from "@data-access/program";
import subjectProvider from "@data-access/subject";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { Button, Col, Form, Input, Row, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SubSelect } from "@components/SubSelect";
import { Modal } from "./styled";
import resultProvider from "@data-access/result";

const ListPoint = ({ eventBack, type, data }) => {
  const disableInput = type === "detail";
  const [form] = Form.useForm();
  const [state, setState] = useState({
    data: data || [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    resultProvider.search(state.param).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({ ...state, data: json.data });
      } else {
        toast.error("Lỗi: " + json.message);
      }
    });
  };

  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      key: "stt",
      width: 70,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "code",
      key: "code",
      title: (
        <div className="custom-header">
          <div className="title-box">Mã môn</div>
        </div>
      ),
      width: 100,
      render: (_, data) => {
        return data.subjectInfo && data.subjectInfo.code;
      },
    },
    {
      dataIndex: "name",
      key: "name",
      width: 200,
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
        </div>
      ),
      render: (_, data) => {
        return data.subjectInfo && data.subjectInfo.name;
      },
    },
    {
      dataIndex: "muster",
      key: "muster",
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm danh</div>
        </div>
      ),
      render: (item, data) => {
        return data.subjectInfo && item + " / " + data.subjectInfo.lesson;
      },
    },
    {
      dataIndex: "midPoint",
      key: "midPoint",
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm giữa kì</div>
        </div>
      ),
    },
    {
      dataIndex: "endPoint",
      key: "endPoint",
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm cuối kì</div>
        </div>
      ),
    },
    {
      dataIndex: "total",
      key: "total",
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm trung bình</div>
        </div>
      ),
    },
    {
      dataIndex: "rank",
      key: "rank",
      title: (
        <div className="custom-header">
          <div className="title-box">Xếp loại</div>
        </div>
      ),
    },
    // {
    //   width: 80,
    //   dataIndex: "tienIch",
    //   key: "tienIch",
    //   title: (
    //     <div className="custom-header">
    //       <div className="title-box">Tiện ích</div>
    //     </div>
    //   ),
    //   render: (_, data) => {
    //     if (!disableInput)
    //       return (
    //         <Tooltip title="Xóa">
    //           <DeleteForeverOutlinedIcon
    //             className="pointer"
    //             onClick={() => handleDelete(data.stt - 1)}
    //             color="error"
    //           />
    //         </Tooltip>
    //       );
    //   },
    // },
  ];

  console.log(state.data);
  return (
    <Modal
      className="modal-lg w50"
      style={{ width: "1000px" }}
      size="sm"
      onCancel={eventBack}
      visible={true}
      footer={null}
    >
      <>
        <div className="head text-muted text-center mt-2 mb-3">
          <big>Bảng điểm sinh viên</big>
        </div>
        <Table
          className="custom-table"
          scroll={{ x: 500, y: 400 }}
          columns={columns}
          dataSource={state.data}
        ></Table>

        <div className="footer d-flex justify-end">
          <Button
            className="mr-2"
            danger
            type="primary"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
        </div>
      </>
    </Modal>
  );
};
export default ListPoint;
