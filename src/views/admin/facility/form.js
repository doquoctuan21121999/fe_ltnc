import React, { forwardRef, useImperativeHandle, useState } from "react";
import { toast } from "react-toastify";
// reactstrap components
import { Button, Form, Input, Select, Modal } from "antd";
import healthFacilityProvider from "../../../data-access/facility";

const HealthFacilityForm = forwardRef(({ reload }, ref) => {
  const [state, setState] = useState({});

  const [form] = Form.useForm();

  const fields = ["address", "name", "level", "id"];
  useImperativeHandle(ref, () => ({
    show: (data, mode = 1) => {
      if (data)
        form.setFields(
          fields.map((item) => ({ name: item, value: data[item] }))
        );
      setState({ ...state, visible: true, mode });
    },
  }));

  const create = (values) => {
    healthFacilityProvider.create(values).then((json) => {
      if (json && json.code === 200 && json.data) {
        reload();
        setState({ ...state, visible: false });
        toast.success("Thêm thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const update = (values) => {
    healthFacilityProvider
      .update(values, form.getFieldValue("id"))
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          reload();
          setState({ ...state, visible: false });
          toast.success(json.message);
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
      onCancel={() => {
        setState({ ...state, visible: false });
        form.resetFields();
      }}
      visible={state.visible}
      footer={null}
    >
      <div className="modal-body p-0">
        <div className="text-muted text-center mt-2 mb-3">
          {state.mode === 1 ? (
            <big> Chi tiết cơ sở </big>
          ) : state.mode === 2 ? (
            <big> Thêm mới cơ sở </big>
          ) : (
            <big> Chỉnh sửa cơ sở </big>
          )}
        </div>
        <Form
          form={form}
          onFinish={(values) => {
            if (state.mode == 2) {
              create(values);
            } else {
              update(values);
            }
          }}
        >
          <Form.Item
            style={{ display: "inline" }}
            label="Tên cơ sở"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên cơ sở",
              },
            ]}
          >
            <Input type="text" autoComplete="off" disabled={state.mode === 1} />
          </Form.Item>
          <Form.Item
            style={{ display: "inline" }}
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}
          >
            <Input type="text" autoComplete="off" disabled={state.mode === 1} />
          </Form.Item>
          <Form.Item
            style={{ display: "inline" }}
            label="Cấp cơ sở"
            name="level"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập cấp",
              },
            ]}
          >
            <Input type="text" autoComplete="off" disabled={state.mode === 1} />
          </Form.Item>

          <div className="footer d-flex justify-end">
            <Button
              className="mr-2"
              danger
              type="primary"
              onClick={() => {
                setState({ ...state, visible: false });
                form.resetFields();
              }}
            >
              Trở lại
            </Button>
            {state.mode !== 1 && (
              <Button type="primary" htmlType="submit">
                {state.mode === 2 ? "Thêm" : "Sửa"}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
});
export default HealthFacilityForm;
