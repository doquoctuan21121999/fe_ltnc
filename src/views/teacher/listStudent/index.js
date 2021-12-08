import Header from "@components/Headers/Header.js";
import classProvider from "@data-access/class";
import resultProvider from "@data-access/result";
import AddIcon from "@material-ui/icons/Add";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import { splitParamsUrl } from "@utils/common";
import { Badge, Button, Col, Input, Row, Table, Tooltip } from "antd";
import { React, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, Container } from "reactstrap";
import Paginations from "../../../components/Pagination";
import { Screen } from "./styled";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ClearIcon from "@material-ui/icons/Clear";
import { Content } from "./styled";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import TableSummary from "./TableSummary";

const Tables = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);
  const { search } = window.location;
  let courseId;
  let subjectId;

  if (search) {
    const paramStr = splitParamsUrl(search);
    paramStr.forEach((param) => {
      if (param.hasOwnProperty("courseId")) {
        courseId = param.courseId;
      }
      if (param.hasOwnProperty("subjectId")) {
        subjectId = param.subjectId;
      }
    });
  }

  const changePage = (value) => {
    setState({ ...state, param: { ...state.param, page: value } });
  };

  const handleChangePoint = (index, value, key) => {
    const newDataRender = Object.assign([], state.dataRender);
    newDataRender[index][key] = parseFloat(value);
    // newDataRender[index]["isUpdate"] = true;
    setState({ ...state, dataRender: newDataRender });
  };

  const loadPage = () => {
    resultProvider.getPoints(courseId, subjectId).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          loading: false,
          resData: json.data,
          dataRender: handleData(json.data),
          totalPage: json.totalPages,
          page: json.pageNumber,
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
      }
    });
  };

  const handleData = (resData) => {
    const { listRegister = [], listResult = [] } = resData;
    listRegister.forEach((item) => {
      if (!listResult.some((element) => element.registerId == item.id)) {
        listResult.push({ subjectId, registerId: item.id, registerInfo: item });
      }
    });
    return listResult;
  };

  const approvedPoint = (data, index) => {
    const { midPoint, endPoint, muster, registerId, subjectId, id, isPass } =
      data;
    const dataUpdate = {
      midPoint,
      endPoint,
      muster,
      registerId,
      subjectId,
      id,
      isPass,
    };
    resultProvider
      .enterPoint(dataUpdate)
      .then((json) => {
        if (json && json.code === 200) {
          toast.success("Cập nhật thành công!");
          const newDataRender = Object.assign([], state.dataRender);
          newDataRender[index] = data;

          setState({
            ...state,
            isEditTable: false,
            dataRender: newDataRender,
          });
        } else {
          toast.warning(json.message);
        }
      })
      .catch((e) => toast.error("loi"));
  };

  const submitAll = () => {
    const body = state.dataRender.map((item) => {
      const { midPoint, endPoint, muster, registerId, subjectId, id } = item;
      return {
        midPoint,
        endPoint,
        muster,
        registerId,
        subjectId,
        id,
      };
    });
    resultProvider
      .enterListPoint(body)
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          toast.success("Cập nhật thành công!");
          setState({
            ...state,
            isEditTable: !state.isEditTable,
            dataRender: json.data,
          });
        } else {
          toast.warning(json.message);
        }
      })
      .catch((e) => toast.error("loi"));
  };

  const changeEditTable = () => {
    setState({ ...state, isEditTable: !state.isEditTable });
  };

  const getColumns = () => {
    if (state.resData?.subjectInfo?.isUsePoint) {
      return [
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Điểm giữa kỳ</div>
            </div>
          ),
          dataIndex: "midPoint",
          key: "midPoint",
          width: 70,
          render: (item, data, index) => {
            return state.isEditTable ? (
              <div>
                <Input
                  placeholder="Nhập điểm giữa kỳ"
                  name="midPoint"
                  type="number"
                  style={{ height: "22px" }}
                  value={
                    data.subjectInfo && !data.subjectInfo.isUsePoint ? "" : item
                  }
                  onChange={(e) => {
                    handleChangePoint(index, e.target.value, "midPoint");
                  }}
                />
              </div>
            ) : (
              <div>{item ? (item || 0).toFixed(2) : ""}</div>
            );
          },
        },
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Điểm cuối kỳ</div>
            </div>
          ),
          dataIndex: "endPoint",
          key: "endPoint",
          width: 70,
          render: (item, data, index) => {
            return state.isEditTable ? (
              <div>
                <Input
                  style={{ height: "22px" }}
                  placeholder="Nhập điểm cuối kỳ"
                  name="endPoint"
                  value={
                    data.subjectInfo && !data.subjectInfo.isUsePoint ? "" : item
                  }
                  type="number"
                  onChange={(e) => {
                    handleChangePoint(index, e.target.value, "endPoint");
                  }}
                />
              </div>
            ) : (
              <div>{item ? (item || 0).toFixed(2) : ""}</div>
            );
          },
        },
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Tổng điểm</div>
            </div>
          ),
          dataIndex: "total",
          key: "total",
          width: 60,
          render: (item, data) => (item ? item.toFixed(2) : ""),
        },
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Loại điểm</div>
            </div>
          ),
          dataIndex: "rank",
          key: "rank",
          width: 60,
        },
      ];
    } else {
      return [
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Tổng kết</div>
            </div>
          ),
          dataIndex: "isPass",
          key: "isPass",
          width: 60,
          align: "center",
          render(item) {
            return item != null ? (
              <Badge
                className="w100 pointer"
                style={{
                  backgroundColor: item === 1 ? "var(--green)" : "var(--red)",
                }}
                count={item === 1 ? "Hoàn thành" : "Trượt"}
              ></Badge>
            ) : null;
          },
        },
        {
          title: (
            <div className="custom-header">
              <div className="title-box">Tiện ích</div>
            </div>
          ),
          key: "tienIch",
          width: 60,
          align: "center",
          render(_, data, index) {
            return (
              <>
                <Tooltip title="Hoàn thành">
                  <CheckCircleOutlined
                    className="text-yellow pointer i-edit"
                    onClick={() => approvedPoint({ ...data, isPass: 1 }, index)}
                  />
                </Tooltip>
                <Tooltip title="Trượt">
                  <CloseCircleOutlined
                    className="text-red pointer i-edit"
                    onClick={() => approvedPoint({ ...data, isPass: 2 }, index)}
                  />
                </Tooltip>
              </>
            );
          },
        },
      ];
    }
  };
  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 40,
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên sinh viên</div>
        </div>
      ),
      key: "name",
      width: 100,
      render: (_, data) => {
        return data?.registerInfo?.studentInfo?.fullName;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Điểm danh</div>
        </div>
      ),
      dataIndex: "muster",
      key: "muster",
      width: 60,
      render: (item = 0, data, index) => {
        return (
          <div style={{ display: "flex" }}>
            <Badge
              count={item + "/" + state.resData?.subjectInfo?.lesson}
            ></Badge>
            <AddIcon
              style={{ cursor: "pointer", justifyContent: "space-between" }}
              onClick={(e) => {
                // handleChangePoint(data, item + 1, "muster");
                approvedPoint({ ...data, muster: item + 1 }, index);
              }}
            />
          </div>
        );
      },
    },
    ...getColumns(),
  ];

  const RowInfo = ({ title, value }) => {
    return (
      <Row>
        <Col span={6}>
          <label>{title}</label>
        </Col>
        <Col span={18}>
          <p style={{ paddingTop: "3px" }}>
            <b> {value}</b>
          </p>
        </Col>
      </Row>
    );
  };

  return (
    <Content>
      <div className="content">
        <div className="header d-flex justify-space-between">
          <div>
            <h3>Bảng điểm</h3>
          </div>
          <div>
            {state.resData?.subjectInfo?.isUsePoint &&
              (!state.isEditTable ? (
                <Button
                  className="btn-sm mr-3 blue"
                  success
                  type="primary"
                  onClick={() => changeEditTable()}
                >
                  Nhập điểm
                </Button>
              ) : (
                <div>
                  <Button
                    className="btn-sm mr-3"
                    danger
                    type="primary"
                    onClick={() => changeEditTable()}
                  >
                    Hủy
                  </Button>
                  <Button
                    className="btn-sm mr-3 blue"
                    success
                    type="primary"
                    onClick={() => submitAll()}
                  >
                    Hoàn tác
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <Row>
          <Col span={8} className="pr-1 info">
            <Row>
              <Col span={24}>
                <RowInfo
                  title="Mã khóa"
                  value={state.resData?.courseInfo?.programInfo?.code}
                />
                <RowInfo
                  title="Khóa"
                  value={state.resData?.courseInfo?.programInfo?.name}
                />
                <RowInfo
                  title="Số sinh viên"
                  value={state.resData?.courseInfo?.numberRegister}
                />
                <RowInfo
                  title="Mã môn"
                  value={state.resData?.subjectInfo?.code}
                />
                <RowInfo title="Môn" value={state.resData?.subjectInfo?.name} />
                <RowInfo
                  title="Số tiết"
                  value={state.resData?.subjectInfo?.lesson}
                />
                <RowInfo
                  title="Loại môn"
                  value={state.resData?.subjectInfo?.type}
                />
                {state.resData?.subjectInfo?.isUsePoint && (
                  <>
                    <RowInfo
                      title="Hệ số giữa kì"
                      value={state.resData?.subjectInfo?.midtermScore}
                    />
                    <RowInfo
                      title="Hệ số cuối kì"
                      value={state.resData?.subjectInfo?.finalScore}
                    />
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <TableSummary
                dataSource={state.dataRender}
                type={state.resData?.subjectInfo?.isUsePoint}
              />
            </Row>
          </Col>
          <Col span={16} className="pl-3">
            <Table
              className="custom-table"
              dataSource={state.dataRender}
              scroll={{ x: "auto", y: 800 }}
              rowKey={(record) => record.id || record?.registerInfo.id}
              columns={columns}
              pagination={false}
            ></Table>
          </Col>
        </Row>

        {/* <Paginations
          page={state.page}
          totalPage={state.totalPage}
          changePage={changePage}
        ></Paginations> */}
      </div>
    </Content>
  );
};

export default Tables;
