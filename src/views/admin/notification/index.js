import { DeleteOutlined } from "@ant-design/icons";
import Header from "@components/Headers/Header.js";
import Pagination from "@components/Pagination";
import notification from "@data-access/notification";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { defaultState } from "@utils/common";
import { Table, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Content } from "@containers/Content";
// reactstrap components
import { Card, CardHeader, Container, Input, Row } from "reactstrap";
import { Screen } from "./styled";

const Notification = () => {
  const [state, setState] = useState(defaultState);
  const [param, setParam] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);
  useEffect(() => {
    loadPage();
  }, [state.size, state.page, param]);

  const changePage = (value) => {
    setState({ ...state, page: value });
    setParam({ ...param, page: value });
  };

  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    console.log(e);
    timeout.current = setTimeout(() => {
      setParam({ ...param, page: 0, [e.target.name]: e.target.value });
      clearTimeout(timeout);
    }, 500);
  };

  const loadPage = () => {
    notification.search(param).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          dataRender: json.data,
          totalPage: json.totalPages,
          totalElements: json.totalElements,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
      }
    });
  };

  const changeModal = (data, index) => {
    setState({
      ...state,
      showModal: !state.showModal,
      dataDetail: data,
      indexDetail: index,
      isCreate: !data,
      isDetail: data && index === undefined,
    });
  };

  const handleDelete = (id) => {
    notification.delete(id).then((json) => {
      console.log(json);
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
      width: 70,
      render: (_, __, index) => {
        return index + 1 + state.param.size * state.param.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Thời gian</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                name="createdAt"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (item) => {
        return (
          <div>
            <strong>{moment(item).format("DD/MM/YYYY")}</strong>
            <div>{moment().subtract(item).format("DD") + " ngày trước"}</div>
          </div>
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Nội dung thông báo</div>
          <div className="addition-box">
            <div className="search-box">
              <input name="content" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "content",
      key: "content",
      render: (item) => {
        return <div style={{ whiteSpace: "pre-wrap" }}>{item}</div>;
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
      width: 100,
      render(_, data) {
        return (
          <div style={{ alignContent: "center", flexBasis: "10%" }}>
            <Tooltip title="Xóa">
              <DeleteForeverOutlinedIcon
                color="error"
                className="pointer"
                onClick={() => handleDelete(data.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <Content>
      <div className="content">
        <CardHeader className="head-content d-flex justify-space-between">
          <div className="a">
            <h3>Thông báo</h3>
          </div>
        </CardHeader>
        <Table
          className="custom-table"
          dataSource={state.dataRender}
          scroll={{ x: 830, y: "auto" }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
      </div>
      <Pagination
        page={state.param.page}
        totalPage={state.totalPage}
        changePage={changePage}
      ></Pagination>
    </Content>
  );
};

export default Notification;
