import Header from "@components/Headers/Header.js";
import Paginations from "@components/Pagination";
import healthFacilityProvider from "@data-access/facility";
import { Content } from "@containers/Content";
// reactstrap components
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import facilityAction from "@redux/actions/facility";
import { defaultState } from "@utils/common";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Card, CardHeader, Container, Row } from "reactstrap";
import HealthFacilityForm from "./form";
import { Button, Table, Tooltip } from "antd";
import { Screen } from "./styled";
import InputSearch from "../../../components/InputSearch";

const Facility = (props) => {
  const [state, setState] = useState({});
  const [params, setParams] = useState({ page: 0, size: 10 });
  const refModal = useRef(null);

  useEffect(() => {
    loadPage();
  }, [params]);

  const loadPage = () => {
    healthFacilityProvider.search(params).then((json) => {
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
  const showModal = (data, mode) => {
    refModal.current.show(data, mode);
  };

  const handleDelete = (id) => {
    healthFacilityProvider.delete(id).then((json) => {
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
      width: 50,
      render: (_, __, index) => {
        return index + 1 + params.size * params.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên cơ sở</div>
          <div className="addition-box">
            <InputSearch
              search={(value) => setParams({ ...params, name: value })}
            />
          </div>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      fixed: "left",
      // width: "40%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Địa chỉ</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "address",
      key: "address",
      // width: "30%",
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
      // width: "30%",
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
      // width: "30%",
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
      width: 80,
      render(_, data) {
        return (
          <div>
            {/* <Tooltip title="Chi tiết">
              <DescriptionOutlinedIcon
                onClick={() => showModal(data, 1)}
                className="pointer"
                color="primary"
              />
            </Tooltip> */}

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

  console.log(state);
  return (
    <Content>
      <div className="content">
        <div className="head-content d-flex justify-space-between">
          <div className="a">
            <h3>Danh sách cơ sở đào tạo</h3>
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
        <Paginations
          page={params.page}
          totalPage={state.totalPage}
          changePage={(value) => setParams({ ...params, page: value })}
        ></Paginations>
      </div>
      <HealthFacilityForm reload={loadPage} ref={refModal} />
    </Content>
  );
};

export default connect((state) => {
  return {
    role: state.auth.currentUser,
  };
})(Facility);
