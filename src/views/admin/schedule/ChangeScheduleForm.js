import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  Row,
} from "reactstrap";
import "./style.scss";
import userProvider from "@data-access/user";
import placeProvider from "@data-access/place";
import scheduleProvider from "@data-access/schedule";

import constants from "@utils/const";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { MultiDateSelect } from "@components/DatePicker";
import moment from "moment";
import { getDay, getKipHoc } from "@utils/common";
import { RollbackOutlined } from "@ant-design/icons";

const ScheduleForm = (props) => {
  const { eventBack, isCreate, isDetail, data, courseId, listSubject } = props;
  const [state, setState] = useState({
    defaultModal: true,
    data:
      {
        ...data,
        courseId,
        dates:
          (data &&
            data.dates &&
            JSON.parse(data.dates).map((item, key) => {
              return moment(item);
            })) ||
          [],
        changeInfo: {
          ...data.changeInfo,
          dates:
            (data &&
              data.dates &&
              JSON.parse(data.dates).map((item, key) => {
                return moment(item);
              })) ||
            [],
        },
      } || {},
  });
  const [teachers, setTeachers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getData();
    getPlaces();
  }, [state.reload, state.param]);

  const change = (e, value) => {
    if (typeof e === "string") {
      if (e === "placeId") {
        setState({
          ...state,
          data: {
            ...state.data,
            placeId: value,
            placeInfo: places && places.find((item) => item.id === value),
          },
        });
      } else if (e === "subjectId") {
        setState({
          ...state,
          data: {
            ...state.data,
            subjectId: value,
            subjectInfo:
              listSubject && listSubject.find((item) => item.id === value),
          },
        });
      } else if (e === "teacherId") {
        setState({
          ...state,
          data: {
            ...state.data,
            teacherId: value,
            teacher: teachers && teachers.find((item) => item.id === value),
          },
        });
      } else setState({ ...state, data: { ...state.data, [e]: value } });
    } else
      setState({
        ...state,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
  };

  const getData = () => {};

  const getPlaces = () => {
    placeProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200) {
        setPlaces(json.data);
      }
    });
  };
  const getTeacher = (subjectId) => {
    change("subjectId", subjectId);
    userProvider
      .search({
        page: 0,
        size: 1000,
        subjectId,
        role: constants.roles.teacher.value,
      })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setTeachers(json.data);
          if (json.data.length === 0)
            toast.error("Không có giảng viên nào dạy môn này");
        }
      });
  };

  const validate = (data) => {
    const message = [];
    if (!data.subjectId) {
      message.push("Môn chưa nhập");
    }
    if (!data.teacherId) {
      message.push("Giảng viên chưa nhập");
    }
    if (!data.placeId) {
      message.push("Địa điểm chưa nhập");
    }
    if (!data.day) {
      message.push("Ngày học chưa nhập");
    }
    if (!data.kipHoc) {
      message.push("Kíp học chưa nhập");
    }

    toast.error(message[0]);
    if (message.length > 0) return true;
  };
  const update = (body, id) => {
    if (validate(body)) return;
    console.log(body);
    scheduleProvider.handleChangeInfo(id, body).then((json) => {
      if (json && json.code === 200 && json.data) {
        toast.success(json.message);
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  console.log(state.data);
  return (
    <Modal className="modal-lg" size="sm" isOpen={true}>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div
              className="text-muted text-center mt-2 mb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <big>YÊU CẦU ĐỔI LỊCH</big>
            </div>
            <RollbackOutlined
              onClick={() => {
                eventBack();
              }}
            />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <Row>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Môn
                          </label>
                          <Select
                            className="form-control-alternative"
                            value={{
                              label:
                                state.data.subjectInfo &&
                                state.data.subjectInfo.name,
                              value: state.data.subjectId,
                            }}
                            isDisabled={true}
                            placeholder="Chọn môn"
                            options={
                              listSubject &&
                              listSubject.map((item) => {
                                return {
                                  label: item.name,
                                  value: item.id,
                                };
                              })
                            }
                            onChange={(item) => getTeacher(item.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Thứ
                          </label>
                          <Input
                            style={{ textDecorationLine: "line-through" }}
                            value={getDay(state.data.day)}
                          ></Input>
                          <Select
                            className="form-control-alternative"
                            placeholder="Chọn thứ"
                            value={{
                              label:
                                state.data.changeInfo &&
                                getDay(state.data.changeInfo.day),
                              value: state.data.changeInfo.day,
                            }}
                            options={constants.day}
                            onChange={(item) => change("day", item.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Địa điểm
                          </label>
                          <Input
                            style={{ textDecorationLine: "line-through" }}
                            value={
                              state.data.placeInfo &&
                              state.data.placeInfo.address
                            }
                          ></Input>
                          <Select
                            className="form-control-alternative"
                            placeholder="Chọn địa điểm"
                            value={{
                              label:
                                state.data.changeInfo &&
                                state.data.changeInfo.placeInfo &&
                                state.data.changeInfo.placeInfo.address,
                              value:
                                state.data.changeInfo &&
                                state.data.changeInfo.placeInfo &&
                                state.data.changeInfo.placeInfo.id,
                            }}
                            options={places.map((item) => {
                              return {
                                label: item.address,
                                value: item.id,
                              };
                            })}
                            onChange={(item) => change("placeId", item.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Giảng viên
                          </label>
                          <Select
                            className="form-control-alternative"
                            isDisabled={true}
                            placeholder="Chọn giảng viên"
                            value={{
                              label:
                                state.data.teacher &&
                                state.data.teacher.fullName,
                              value:
                                state.data.teacher && state.data.teacher.id,
                            }}
                            options={teachers.map((item) => {
                              return {
                                label: item.fullName,
                                value: item.id,
                              };
                            })}
                            onChange={(item) => change("teacherId", item.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Thời gian
                          </label>
                          <Input
                            style={{ textDecorationLine: "line-through" }}
                            value={getKipHoc(state.data.kipHoc)}
                          ></Input>
                          <Select
                            className="form-control-alternative"
                            placeholder="Chọn kíp"
                            value={{
                              value:
                                state.data.changeInfo &&
                                state.data.changeInfo.kipHoc,
                              label:
                                state.data.changeInfo &&
                                getKipHoc(state.data.changeInfo.kipHoc),
                            }}
                            options={constants.kipOption}
                            onChange={(item) => change("kipHoc", item.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Ngày
                          </label>
                          <MultiDateSelect
                            placeholder="Chọn ngày"
                            value="Chọn ngày"
                            defaultValue={state.data.dates}
                            onChange={(item) => change("dates", item)}
                          />
                          <MultiDateSelect
                            placeholder="Chọn ngày"
                            value="Chọn ngày"
                            defaultValue={state.data.changeInfo.dates}
                            onChange={(item) => change("dates", item)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <Button
                  className="my-12"
                  color="primary"
                  type="button"
                  onClick={() => eventBack()}
                >
                  Trở lại
                </Button>
                <Button
                  className="my-12"
                  color="primary"
                  type="button"
                  onClick={() => update(state.data.changeInfo, state.data.id)}
                >
                  Sửa
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
export default ScheduleForm;
