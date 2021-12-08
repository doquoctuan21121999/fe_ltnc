import Pagination from "@components/Pagination";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import subjectAction from "@redux/actions/subject";
import { Button, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import InputSearch from "@components/InputSearch";
// reactstrap components
import { Card, Container } from "reactstrap";
import Header from "../../../components/Headers/Header.js";
import { defaultState } from "../../../utils/common";
import subjectProvider from "./../../../data-access/subject";
import SubjectForm from "./form";
import constants from "@utils/const";
import moment from "moment";

import { Content } from "@containers/Content";
const Subject = ({ role }) => {
  const [state, setState] = useState(defaultState);
  const timeout = useRef(null);

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
  };

  const loadPage = () => {
    subjectProvider.search(state.param).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          data: json.data,
          total: json.totalPages,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const showModal = (data, type) => {
    let isCreate = type === "create";
    let isDetail = type === "detail";
    let reload = type === "back" ? !state.reload : state.reload;

    setState({
      ...state,
      showModal: !state.showModal,
      dataDetail: data,
      isCreate,
      isDetail,
      reload,
      type,
    });
  };

  const search = (name) => (value) => {
    setState({
      ...state,
      param: { ...state.param, page: 0, [name]: value },
    });
  };

  const handleDelete = (id) => {
    subjectProvider.delete(id).then((json) => {
      if (json && json.code === 200) {
        toast.success("Xóa thành công");
        loadPage();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 60,
      render: (_, __, index) => {
        return index + 1 + state.param.size * state.param.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã môn</div>
          <div className="addition-box">
            <InputSearch search={search("code")} />
          </div>
        </div>
      ),
      dataIndex: "code",
      key: "code",
      fixed: "left",
      width: 120,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên môn</div>
          <div className="addition-box">
            <InputSearch search={search("name")} />
          </div>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 250,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Loại môn</div>
          <div className="addition-box">
            <InputSearch search={search("type")} />
          </div>
        </div>
      ),
      dataIndex: "type",
      key: "type",
      width: 180,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số tiết</div>
          <div className="addition-box">
            <InputSearch search={search("lesson")} />
          </div>
        </div>
      ),
      dataIndex: "lesson",
      key: "lesson",
      width: 115,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Học phí</div>
          <div className="addition-box">
            <InputSearch type="number" search={search("price")} />
          </div>
        </div>
      ),
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (item) => item.formatPrice(),
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày tạo</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Ngày sửa</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tiện ích</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "tienIch",
      key: "tienIch",
      width: 120,
      render(_, data) {
        return (
          <div>
            <Tooltip title="Chi tiết">
              <DescriptionOutlinedIcon
                onClick={() => showModal(data, "detail")}
                className="pointer"
                color="primary"
              />
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
              <EditOutlinedIcon
                color="primary"
                className="pointer"
                onClick={() => showModal(data, "update")}
              />
            </Tooltip>
            {data.isActive && (
              <Tooltip title="Xóa">
                <DeleteForeverOutlinedIcon
                  color="error"
                  className="pointer"
                  onClick={() => handleDelete(data.id, "delete")}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <Content>
      <div className="content">
        <div className="head-content d-flex justify-space-between">
          <div className="">
            <h3>Môn học</h3>
          </div>
          <div>
            <Button
              className="btn-sm blue"
              submit
              type="primary"
              onClick={() => showModal({}, "create")}
            >
              Thêm mới
            </Button>
          </div>
        </div>

        <div className="table-ds">
          <Table
            className="custom-table"
            dataSource={state.data}
            scroll={{ x: 830, y: 600 }}
            rowKey={(record) => record.id}
            columns={columns}
            footer={null}
          ></Table>
        </div>
      </div>
      <Pagination
        page={state.param.page}
        totalPage={state.total}
        changePage={changePage}
      ></Pagination>
      {state.showModal && (
        <SubjectForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          type={state.type}
        ></SubjectForm>
      )}
    </Content>
  );
};

export default connect(
  (state) => {
    return {
      role: state.auth.currentUser.role,
      listSubjects: state.subject.listSubjects,
      totalPage: state.subject.totalPage,
    };
  },
  {
    getSubjects: subjectAction.getSubjects,
  }
)(Subject);
