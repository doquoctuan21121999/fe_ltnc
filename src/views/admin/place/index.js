// core components
import { Content } from "@containers/Content";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Button, Table, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import InputSearch from "../../../components/InputSearch";
import Paginations from "../../../components/Pagination";
import placeProvider from "./../../../data-access/place";
import PlaceForm from "./form";

const Place = (props) => {
  const [state, setState] = useState({});
  const [params, setParams] = useState({ page: 0, size: 10 });
  const timeout = useRef(null);
  const refModal = useRef(null);

  useEffect(() => {
    loadPage();
  }, [params]);

  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
  };

  const loadPage = () => {
    placeProvider.search(params).then((json) => {
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
        toast.error(json.message);
      }
    });
  };

  const showModal = (data, type) => {
    refModal.current.show(data, type);
  };

  const handleDelete = (id) => {
    placeProvider.delete(id).then((json) => {
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
      width: "5%",
      render: (_, __, index) => {
        return index + 1 + params.size * params.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Địa chỉ</div>
          <div className="addition-box">
            <InputSearch
              search={(value) => setParams({ ...params, address: value })}
            />
          </div>
        </div>
      ),
      dataIndex: "address",
      key: "address",
      fixed: "left",
      // width: "20%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Cơ sở</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "coSo",
      key: "coSo",
      // width: "10%",
      render: (_, data) => {
        return data.healthFacility ? data.healthFacility.name : "";
      },
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
      // width: "10%",
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
      // width: "10%",
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
      width: 150,
      render(_, data) {
        return (
          <div>
            <Tooltip title="Chi tiết">
              <DescriptionOutlinedIcon
                onClick={() => showModal(data, 1)}
                className="pointer"
                color="primary"
              />
            </Tooltip>
            <Tooltip title="Chỉnh sửa">
              <EditOutlinedIcon
                color="primary"
                className="pointer"
                onClick={() => showModal(data, 3)}
              />
            </Tooltip>
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
        <div className="head-content d-flex justify-space-between">
          <div className="a">
            <h3>Danh sách địa điểm</h3>
          </div>
          <Button
            className="btn-sm mr-3 blue"
            success
            type="primary"
            onClick={() => showModal(null, 2)}
          >
            Thêm mới
          </Button>
        </div>
        <Table
          className="custom-table"
          dataSource={state.dataRender}
          scroll={{ x: 830, y: "auto" }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
      </div>
      <Paginations
        page={params.page}
        totalPage={state.totalPage}
        changePage={(value) => setParams({ ...params, page: value })}
      ></Paginations>
      <PlaceForm ref={refModal} reload={loadPage} />
    </Content>
  );
};

export default connect((state) => {
  return {
    role: state.auth.currentUser,
  };
})(Place);
