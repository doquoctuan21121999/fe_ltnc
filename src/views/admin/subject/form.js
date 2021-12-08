import { Modal } from "@utils/styled";
// reactstrap components
import { Button, Col, Form, Input, InputNumber, Row, Switch } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import subjectProvider from "./../../../data-access/subject";

const SubjectForm = ({ eventBack, type, data }) => {
  const disableInput = type === "detail";
  const isCreate = type === "create";
  const [isSetting, setIsSetting] = useState(data.isUsePoint);
  const [state, setState] = useState({
    data: data || {},
  });
  const [form] = Form.useForm();

  const [hasMidPoint, setHasMidPoint] = useState(false);

  const handleShowSetting = () => {
    setIsSetting(!isSetting);
  };

  const onFinish = (values) => {
    console.log(values);
    if (isCreate) {
      subjectProvider.create(values).then((json) => {
        if (json && json.code === 200 && json.data) {
          eventBack();
          toast.success(json.message);
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          toast.error(json.message);
        }
      });
    } else {
      subjectProvider.update(values, data.id).then((json) => {
        if (json && json.code === 200 && json.data) {
          eventBack();
          toast.success(json.message);
        } else if (json && json.code === 401) {
          window.location.href = "/login";
        } else {
          setState({ ...state, loading: false });
          toast.error(json.message);
        }
      });
    }
  };

  return (
    <Modal footer={null} size="sm" visible={true} onCancel={eventBack}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="head text-muted text-center mt-2 mb-3">
          {disableInput ? (
            <big>Chi tiết môn học</big>
          ) : isCreate ? (
            <big>Thêm mới môn học</big>
          ) : (
            <big>Chỉnh sửa môn học</big>
          )}
        </div>
        <Row>
          <Col span={12} className="pr-2">
            <Form.Item
              label="Tên môn học"
              name="name"
              initialValue={state.data.name}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên môn !",
                },
              ]}
            >
              <Input
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập tên"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12} className="pr-2">
            <Form.Item
              label="Học phí"
              name="price"
              initialValue={state.data.price}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập học phí !",
                },
              ]}
            >
              <InputNumber
                style={{ width: 228 }}
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập học phí"
                min={0}
                step={100.0}
              ></InputNumber>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="pr-2">
            <Form.Item
              label="Mã môn"
              name="code"
              initialValue={state.data.code}
            >
              <Input
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập mã"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12} className="pr-2">
            <Form.Item
              label="Số tiết"
              name="lesson"
              initialValue={state.data.lesson}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số tiết !",
                },
              ]}
            >
              <InputNumber
                style={{ width: 228 }}
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập số tiết"
                min={0}
                step={1}
              ></InputNumber>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8} className="pr-2">
            <Form.Item
              label="Thiết lập điểm"
              name="isUsePoint"
              initialValue={data.isUsePoint}
            >
              <Switch
                disabled={disableInput}
                defaultChecked={data.isUsePoint}
                onChange={handleShowSetting}
              />
            </Form.Item>
          </Col>
          {isSetting ? (
            <Col span={16} className="pr-2">
              <Row>
                <Col span={10} className="pr-2">
                  <Form.Item
                    label="Hệ số giữa kỳ"
                    initialValue={data.midtermScore}
                    name="midtermScore"
                  >
                    <InputNumber
                      disabled={disableInput}
                      min={0.0}
                      max={1}
                      step={0.1}
                      allowClear="true"
                      size="medium"
                    />
                  </Form.Item>
                </Col>
                <Col span={10} className="pr-2">
                  <Form.Item
                    label="Hệ số cuối kỳ"
                    name="finalScore"
                    decimalSeparator="1"
                    initialValue={data.finalScore}
                    rules={[
                      {
                        required: hasMidPoint,
                        message:
                          "Môn học có điểm giữa kỳ bắt buộc phải có điểm cuối kỳ !",
                      },
                    ]}
                  >
                    <InputNumber
                      disabled={disableInput}
                      min={0.0}
                      max={1.0}
                      step={0.1}
                      type="number"
                      allowClear="true"
                      size="medium"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col span={12} className="pr-2">
              Môn học đánh giá đạt/không đạt
            </Col>
          )}
        </Row>
        <div className="text-center">
          <Button
            type="primary"
            danger
            className="mr-2"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
          {!disableInput && (
            <Button type="primary" htmlType="submit">
              {isCreate ? "Thêm" : "Sửa"}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
};
export default SubjectForm;
