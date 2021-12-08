import courseProvider from "@data-access/course";
import healthFacilityProvider from "@data-access/facility";
import programProvider from "@data-access/program";
import subjectProvider from "@data-access/subject";
// reactstrap components
import { Button, Col, DatePicker, Form, Row, Select, Input } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "./styled";
// import "antd/dist/antd.css";

const CourseForm = (props) => {
  const {
    eventBack,
    isCreate,
    isDetail,
    data,
    isList,
    isPlan,
    isStudying,
    isDoned,
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState({
    defaultModal: true,
    data: data || {},
  });
  const [programs, setPrograms] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);

  const changeProgram = (value) => {
    setState({
      ...state,
      data: {
        ...state.data,
        programId: value,
        semester:
          programs.filter((item) => item.id === value)[0].numberTurn + 1,
      },
    });
  };

  useEffect(() => {
    healthFacilityProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setHealthFacility(json.data);
      }
    });
    programProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setPrograms(json.data);
      }
    });
  }, []);

  const onFinish = (values) => {
    const body = {
      ...values,
      ngayKhaiGiang: values.time[0].format("YYYY-MM-DD"),
      ngayKetThuc: values.time[1].format("YYYY-MM-DD"),
      semester: state.data.semester,
    };
    courseProvider.create(body).then((json) => {
      if (json && json.code === 200 && json.data) {
        window.location.href = "/admin/courses-plan";
        toast.success("Tạo mới thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  return (
    <Modal
      className="modal-lg"
      size="sm"
      onCancel={eventBack}
      visible={true}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="head text-center mb-3">
          <big>Mở khóa học mới</big>
        </div>
        <Form.Item
          label="Chương trình học"
          name="programId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chương trình đào tạo",
            },
          ]}
        >
          <Select
            onChange={(item) => changeProgram(item)}
            options={programs.map((item) => {
              return {
                value: item.id,
                label: item.name,
                ...item,
              };
            })}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Cơ sở đào tạo"
          name="healthFacilityId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn cơ sở đào tạo",
            },
          ]}
        >
          <Select
            options={healthFacility.map((item) => {
              return {
                value: item.id,
                label: item.name,
                ...item,
              };
            })}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Thời gian học (Chọn ngày khai giảng - ngày kết thúc)"
          name="time"
          initialValue={
            state.data.ngayKhaiGiang &&
            state.data.ngayKetThuc && [
              moment(state.data.ngayKhaiGiang),
              moment(state.data.ngayKetThuc),
            ]
          }
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thời gian học",
            },
          ]}
        >
          <DatePicker.RangePicker
            className="w100"
            disabledDate={(date) => {
              return date < moment();
            }}
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
          ></DatePicker.RangePicker>
        </Form.Item>
        <Row>
          <Col span="12" className="pr-2">
            <Form.Item label="Đợt">
              <Input
                disabled
                autoComplete="off"
                value={state.data.semester}
              ></Input>
            </Form.Item>
          </Col>
          <Col span="12" className="pl-2">
            <Form.Item
              label="Giới hạn đăng ký tối đa"
              name="limitRegister"
              initialValue={state.data.limitRegister}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giới hạn đăng ký tối đa",
                },
              ]}
            >
              <Input
                min="1"
                type="number"
                autoComplete="off"
                placeholder="Nhập giới hạn tối đa"
              ></Input>
            </Form.Item>
          </Col>
          <Col span="12" >
            <Form.Item
              label="Hạn đăng ký"
              name="hanDangKy"
              initialValue={state.data.hanDangKy}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày hết hạn đăng ký",
                },
              ]}
            >
              <DatePicker
                className="w100"
                autoComplete="off"
                format={"DD/MM/YYYY"}
                placeholder="Nhập hạn đăng ký"
              ></DatePicker>
            </Form.Item>
          </Col>
          <Col span="12" className="pl-2">
            <Form.Item
              label="Giới hạn đăng ký tối thiểu"
              name="dangKyToiThieu"
              initialValue={state.data.dangKyToiThieu}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giới hạn đăng ký tối thiểu",
                },
              ]}
            >
              <Input
                min="1"
                type="number"
                autoComplete="off"
                placeholder="Nhập giới hạn tối thiểu"
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <div className="footer d-flex justify-end">
          <Button
            className="mr-2"
            danger
            type="primary"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
          <Button type="primary" htmlType="submit">
            Mở khóa
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default CourseForm;
