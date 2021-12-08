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

const ScheduleForm = (props) => {
  const { eventBack, data, courseId } = props;
  const [state, setState] = useState({
    defaultModal: true,
    data:
      {
        ...data,
        changeScheduleId: data.id,
        courseId: data.courseId,
        dates:
          (data &&
            data.dates &&
            JSON.parse(data.dates).map((item, key) => {
              return moment(item);
            })) ||
          [],
      } || {},
  });
  const [teachers, setTeachers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // getData();
    getPlaces();
  }, [state.reload, state.param]);

  const change = (e, value) => {
    if (typeof e === "string") {
      if (e === "placeId") {
        console.log(places.find((item) => item.id === value));
        setState({
          ...state,
          data: {
            ...state.data,
            placeId: value,
            placeInfo: places.find((item) => item.id === value),
          },
        });
      } else setState({ ...state, data: { ...state.data, [e]: value } });
    } else
      setState({
        ...state,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
  };

  const getPlaces = () => {
    placeProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200) {
        setPlaces(json.data);
      }
    });
  };

  const validate = () => {};

  const update = (body) => {
    if (validate(state.data)) return;
    scheduleProvider.changeSchedule(state.data.id,state.data).then((json) => {
      if (json && json.code === 200 && json.data) {
        eventBack();
        toast.success("tạo mới thành công");
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
            <div className="text-muted text-center mt-2 mb-3"> Đổi lịch </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Giảng viên </label>
                    <Input
                      placeholder="Chọn giảng viên"
                      value={state.data.teacher && state.data.teacher.fullName}
                      readOnly
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Môn </label>
                    <Input
                      className="form-control"
                      placeholder="Chọn môn"
                      value={
                        state.data.subjectInfo && state.data.subjectInfo.name
                      }
                      readOnly
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Địa điểm </label>
                    <Select
                      className="form-control-alternative"
                      placeholder="Chọn địa điểm"
                      value={{
                        label:
                          state.data.placeInfo && state.data.placeInfo.address,
                        value: state.data.placeInfo && state.data.placeInfo.id,
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
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Thứ </label>
                    <Select
                      className="form-control-alternative"
                      placeholder="Chọn thứ"
                      value={{
                        label: getDay(state.data.day),
                        value: state.data.day,
                      }}
                      options={constants.day}
                      onChange={(item) => change("day", item.value)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Thời gian </label>
                    <Select
                      className="form-control-alternative"
                      placeholder="Chọn kíp"
                      value={{
                        value: state.data.kipHoc,
                        label: getKipHoc(state.data.kipHoc),
                      }}
                      options={constants.kipOption}
                      onChange={(item) => change("kipHoc", item.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label"> Ngày </label>
                    <MultiDateSelect
                      placeholder="Chọn ngày"
                      value="Chọn ngày"
                      defaultValue={state.data.dates}
                      onChange={(item) => change("dates", item)}
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
                  color="success"
                  type="button"
                  onClick={() => update(state.data)}
                >
                  Đổi
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
