import healthFacilityProvider from "@data-access/facility";
import { Button, Form, Input, Select } from "antd";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { toast } from "react-toastify";
import placeProvider from "./../../../data-access/place";
import { Modal } from "./styled";

const PlaceForm = forwardRef(({ reload }, ref) => {
  const [state, setState] = useState({
    healthFacilities: [],
  });
  const [form] = Form.useForm();

  const fields = ["address", "healthFacilityId", "id"];
  useImperativeHandle(ref, () => ({
    show: (data, mode = 1) => {
      if (data)
        form.setFields(
          fields.map((item) => ({ name: item, value: data[item] }))
        );
      setState({ ...state, visible: true, mode });
    },
  }));

  useEffect(() => {
    healthFacilityProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          healthFacilities: json.data.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        });
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  }, []);

  const create = (values) => {
    placeProvider.create(values).then((json) => {
      if (json && json.code === 200 && json.data) {
        reload();
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
    placeProvider.update(values, form.getFieldValue("id")).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({ ...state, visible: false });
        reload();
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
            <big> Chi tiết địa điểm </big>
          ) : state.mode === 2 ? (
            <big> Thêm mới địa điểm </big>
          ) : (
            <big> Chỉnh sửa địa điểm </big>
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
            label="Tên địa điểm"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên địa điểm",
              },
            ]}
          >
            <Input type="text" autoComplete="off" disabled={state.mode === 1} />
          </Form.Item>
          <Form.Item
            style={{ display: "inline" }}
            label="Cơ sở y tế"
            name="healthFacilityId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Cơ sở y tế",
              },
            ]}
          >
            <Select
              options={state.healthFacilities}
              autoComplete="off"
              disabled={state.mode === 1}
            />
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
export default PlaceForm;
