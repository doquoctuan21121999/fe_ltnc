import React, { useState } from "react";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  Row,
  Table,
} from "reactstrap";
import { useEffect } from "react";
import healthFacilityProvider from "@data-access/facility";
import subjectProvider from "@data-access/subject";
import courseProvider from "@data-access/course";
import programProvider from "@data-access/program";
import { toast } from "react-toastify";
import Select from "react-select";
import Tooltip from "@components/Tooltip";
import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
// import { DatePicker } from "antd";
import { RangePicker } from "@components/DatePicker";
import moment from "moment";
import FormValidator from "@utils/FormValidate";
// import "antd/dist/antd.css";

const CourseForm = (props) => {
  const {
    eventBack,
    isCreate,
    isDetail,
    data = {},
    isList,
    isPlan,
    isStudying,
    isDoned,
  } = props;
  const validator = new FormValidator([
    // {
    //   field: "semester",
    //   method: "isEmpty",
    //   validWhen: false,
    //   message: "Vui lòng chọn cơ sở",
    // },
    {
      field: "name",
      method: (value) => {
        console.log(value);
        console.log(typeof value === "undefined");
        return value === undefined || value === "" ? false : true;
      },
      validWhen: true,
      message: "Vui lòng chọn cơ sở",
    },
  ]);
  const [state, setState] = useState({
    defaultModal: true,
    data: data || {
      name: "",
    },
    validation: validator.valid(),
  });
  console.log(state);
  const [subjects, setSubjects] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);
  const [selects, setSelects] = useState(data.listSubject || []);
  const [subjectIds, setSubjectIds] = useState(
    (data.listSubject &&
      data.listSubject.map((item) => {
        return item.id;
      })) ||
      []
  );

  const change = (e, value) => {
    if (typeof e === "string") {
      if (e === "programId") {
        setState({
          ...state,
          data: {
            ...state.data,
            programId: value,
            semester:
              programs.filter((item) => item.id === value)[0].numberTurn + 1,
          },
        });
      } else setState({ ...state, data: { ...state.data, [e]: value } });
    } else {
      setState({
        ...state,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
    }
  };
  const changeTimeStudy = (e) => {
    if (!e) return;
    const { startDate, endDate } = e;
    console.log(startDate);
    setState({
      ...state,
      data: {
        ...state.data,
        ngayKhaiGiang: startDate && startDate.format("yyyy-MM-DD"),
        ngayKetThuc: endDate && endDate.format("yyyy-MM-DD"),
      },
    });
  };

  const update = (body) => {
    const dataBody = Object.assign({}, body);
    dataBody.createdAt = undefined;
    dataBody.createdBy = undefined;
    dataBody.updatedAt = undefined;
    dataBody.updatedBy = undefined;
    dataBody.healthFacility = undefined;
    dataBody.listSchedules = undefined;
    dataBody.listSubject = undefined;
    dataBody.programInfo = undefined;

    courseProvider.update(dataBody, dataBody.id).then((json) => {
      if (json && json.code === 200 && json.data) {
        toast.success("Cập nhật thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  useEffect(() => {
    healthFacilityProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setHealthFacility(json.data);
      }
    });
    subjectProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setSubjects(json.data);
      }
    });
    programProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setPrograms(json.data);
      }
    });
    if (!isCreate)
      courseProvider.getById(data.id).then((json) => {
        if (json && json.code === 200) {
          setState({ ...state, data: json.data });
          setSelects(json.data.listSubject || []);
          setSubjectIds(
            (json.data.listSubject &&
              json.data.listSubject.map((item) => {
                return item.id;
              })) ||
              []
          );
        }
      });
  }, []);

  const handleDelete = (index) => {
    let newSelects = Object.assign([], selects);
    subjectIds.splice(index, 1);
    newSelects.splice(index, 1);
    setSelects(newSelects);
    change("subjectIds", JSON.stringify(subjectIds));
  };

  let validation = state.isSubmit ? validator.validate(state.data) : validator;

  console.log(state.isSubmit);
  console.log(validation);
  return (
    <Modal className="modal-lg" size="sm" isOpen={true}>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader
            className="bg-transparent"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="text-muted text-center mt-2 mb-3">
              {isDetail ? (
                <big>Chi tiết khóa học</big>
              ) : isCreate ? (
                <big>Thêm mới khóa học</big>
              ) : (
                <big>Chỉnh sửa khóa học</big>
              )}
            </div>
            <RollbackOutlined onClick={(e) => eventBack()} />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">
                      Chương trình đào tạo
                    </label>
                    <Select
                      className="form-control-alternative"
                      defaultValue={{
                        value:
                          state.data.programInfo && state.data.programInfo.id,
                        label:
                          state.data.programInfo && state.data.programInfo.name,
                      }}
                      options={programs.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                          ...item,
                        };
                      })}
                      // name="healthFacilityId"
                      // type="text"
                      isDisabled={isDetail || isStudying}
                      onChange={(item) => change("programId", item.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <Label>Cơ sở đào tạo</Label>
                    <Select
                      defaultValue={{
                        value:
                          state.data.healthFacility &&
                          state.data.healthFacility.id,
                        label:
                          state.data.healthFacility &&
                          state.data.healthFacility.name,
                      }}
                      options={healthFacility.map((item) => {
                        return {
                          value: item.id,
                          label: item.name,
                          ...item,
                        };
                      })}
                      // name="healthFacilityId"
                      // type="text"
                      isDisabled={isDetail || isStudying}
                      onChange={(item) =>
                        change("healthFacilityId", item.value)
                      }
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
                      <span>Thời gian học</span>
                      <span
                        style={{
                          fontWeight: "normal",
                          marginLeft: "10px",
                        }}
                      >
                        ( chọn ngày khai giảng - ngày kết thúc học kỳ )
                      </span>
                    </label>
                    <RangePicker
                      defaultValue={
                        !isCreate && {
                          startDate: moment(
                            state.data.ngayKhaiGiang,
                            "YYYY-MM-DD"
                          ),
                          endDate: moment(state.data.ngayKetThuc, "YYYY-MM-DD"),
                        }
                      }
                      placeHolder={["Ngày khai giảng", "Kết thúc học kỳ"]}
                      className="form-control"
                      // placeholder="Chọn ngày"
                      // value={
                      //   state.data.ngayKetThuc &&
                      //   moment(state.data.ngayKetThuc)
                      // }
                      // format={"DD-MM-YYYY"}
                      // picker="date"
                      onChange={
                        (e) => changeTimeStudy(e)
                        // change("ngayKetThuc", e.format("yyyy-MM-DD"))
                      }
                      isDisabled={[isDetail || isStudying, isDetail]}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup className="mb-3">
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Kỳ học
                    </label>
                    <Input
                      //
                      value={state.data.semester}
                      name="semester"
                      type="number"
                      min="1"
                      onChange={(e) => change(e)}
                      disabled={isDetail}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Giới hạn đăng ký
                    </label>
                    <Input
                      // className="form-control-alternative"
                      value={state.data.limitRegister}
                      name="limitRegister"
                      type="number"
                      min="1"
                      autoComplete="off"
                      onChange={(e) => change(e)}
                      disabled={isDetail || isStudying}
                    />
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
                  onClick={() => update(state.data)}
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
export default CourseForm;
