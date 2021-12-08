// core components
import Header from "@components/Headers/Header.js";
import Pagination from "@components/Pagination";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import programAction from "@redux/actions/program";
import constants from "@utils/const";
import { Button, Table, Tooltip } from "antd";
import { white } from "material-ui/styles/colors";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
// reactstrap components
import { Card, Container } from "reactstrap";
import { Content } from "@containers/Content";
import programProvider from "./../../../data-access/program";
import CreateCourseForm from "./CreateCourseForm";
import DeleteAlerts from "./DeleteAlerts";
import ProgramForm from "./form";
import ListCourse from "./ListCourse";
import { Screen } from "./styled";
import SuccessfulDeleteAlerts from "./SucessfulDeleteAlerts";

const Program = (props) => {
  const { role } = props; //useSelector((state) => state.userApp.currentUser.role);
  const [state, setState] = useState({
    param: {
      page: 0,
      size: 10,
    },
    total: 0,
  });
  const [modal, setModal] = useState({
    showModalCreate: props.showModalCreate,
    showModalUpdate: props.showModalUpdate,
    showCreateCourse: props.showCreateCourse,
    showListCourse: props.showListCourse,
    showDeleteProgram: false,
  });
  const timeout = useRef(null);

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
  };

  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setState({
        ...state,
        param: { ...state.param, page: 0, [e.target.name]: e.target.value },
      });
      clearTimeout(timeout);
    }, 500);
  };

  const loadPage = () => {
    let params = { ...state.param, status: constants.courseStatus.done.value };
    programProvider.search(params).then((json) => {
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
      }
    });
  };

  const showModal = (data, type) => {
    let showModalCreate = type === "create";
    let showModalUpdate = type === "update";
    let showCreateCourse = type === "createCourse";
    let showModalDetail = type === "detail";
    let showListCourse = type === "listCourse";
    let reload = type === "back" ? !state.reload : state.reload;

    setState({
      ...state,
      dataDetail: data,
      // isDetail,
      reload,
    });
    setModal({
      type,
      showModalCreate,
      showModalUpdate,
      showModalDetail,
      showCreateCourse,
      showListCourse,
    });
  };

  const handleDelete = (id) => {
    setModal({ ...modal, showDeleteProgram: true, id });
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
        return index + 1 + state.param?.size * state.param?.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã chương trình</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="code" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "code",
      key: "code",
      fixed: "left",
      width: 150,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên chương trình</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="name" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: "30%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số khóa</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="numberTurn"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "numberTurn",
      key: "numberTurn",
      width: "10%",
      render: (value, data) => {
        return (
          <div
            className="pointer"
            onClick={(e) =>
              setState({ ...state, programId: data.id, programName: data.name })
            }
          >
            {value}
          </div>
        );
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Học phí</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="price"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (price) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price);
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số tiết</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input
                type="number"
                name="lesson"
                onChange={search}
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      ),
      dataIndex: "lesson",
      key: "lesson",
      width: "10%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tốt nghiệp</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "totNghiep",
      key: "totNghiep",
      width: "10%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Trượt</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "truot",
      key: "truot",
      width: "10%",
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
      width: "10%",
      render(_, data) {
        return (
          <div className="custom-header">
            <Tooltip title="Chi tiết">
              <DescriptionOutlinedIcon
                onClick={() => showModal(data, "detail")}
                className="pointer"
                color="primary"
              />
            </Tooltip>
            {role === constants.role.admin && (
              <>
                <Tooltip title="Chỉnh sửa">
                  <EditOutlinedIcon
                    color="primary"
                    className="pointer"
                    onClick={() => showModal(data, "update")}
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <DeleteForeverOutlinedIcon
                    color="error"
                    className="pointer"
                    onClick={() => showModal(data, "showDeleteProgram")}
                  />
                </Tooltip>
              </>
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
          <div className="a">
            <h3>Chương trình đào tạo</h3>
          </div>
          {role === constants.role.admin && (
            <div>
              <Button
                className="btn-sm mr-3 blue"
                success
                type="primary"
                onClick={() => showModal({}, "createCourse")}
              >
                Mở khóa học
              </Button>
              <Button
                className="btn-sm blue"
                submit
                type="primary"
                onClick={() => showModal({}, "create")}
              >
                Thêm mới chương trình
              </Button>
            </div>
          )}
        </div>

        <Table
          className="custom-table"
          dataSource={state.data}
          scroll={{ x: 830, y: "auto" }}
          rowKey={(record) => record.id}
          columns={columns}
          footer={null}
        ></Table>
      </div>
      <Pagination
        page={state.param.page}
        totalPage={state.total}
        changePage={changePage}
      ></Pagination>

      {(modal.type === "detail" ||
        modal.type === "update" ||
        modal.type === "create") && (
        <ProgramForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          type={modal.type}
        />
      )}
      {modal.type === "createCourse" && (
        <CreateCourseForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
        />
      )}
      {modal.type === "showDeleteProgram" && (
        <DeleteAlerts
          afterSuccess={() =>
            setModal({ ...modal, showDeleteProgram: false, showSuccess: true })
          }
          id={state.dataDetail.id}
        />
      )}

      {modal.type === "showDeleteProgram" && (
        <DeleteAlerts
          submit={() =>
            setModal({
              showDeleteProgram: false,
              showSuccess: true,
            })
          }
          cancel={() =>
            setModal({
              showDeleteProgram: false,
              showSuccess: false,
            })
          }
          id={state.dataDetail.id}
        />
      )}

      {modal.showSuccess && (
        <SuccessfulDeleteAlerts
          eventBack={() => setState({ ...state, reload: !state.reload })}
          submit={() =>
            setModal({
              showSuccess: false,
            })
          }
          id={modal.id}
        />
      )}
      {state.programId && (
        <ListCourse
          eventBack={() => setState({ ...state, programId: undefined })}
          programId={state.programId}
          programName={state.programName}
        />
      )}
    </Content>
  );
};

export default connect(
  (state) => {
    return {
      role: state.auth.currentUser.role,
      showModalCreate: state.program.showModalCreate,
      showModalUpdate: state.program.showModalUpdate,
      showCreateCourse: state.program.showCreateCourse,
    };
  },
  {
    getPrograms: programAction.getPrograms,
    updateData: programAction.updateData,
  }
)(Program);
