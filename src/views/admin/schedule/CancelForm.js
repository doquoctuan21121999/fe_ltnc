// reactstrap components
import { Button, Form, Input, Modal } from "antd";
import React from "react";

const CancelForm = (props) => {
  const { eventBack, data, action } = props;

  return (
    <Modal
      className="modal-lg"
      size="sm"
      onCancel={eventBack}
      footer={null}
      visible={true}
    >
      <Form layout="vertical">
        <div className="head text-muted text-center mt-2 mb-3">
          <big>Giảng viên yêu cầu hủy lịch</big>
        </div>
        <Form.Item label="Lý do hủy lịch">
          <Input placeholder="lý do" value={data.reason} />
        </Form.Item>

        <div className="text-center">
          <Button
            className="mr-3"
            style={{
              backgroundColor: "var(--danger)",
              borderColor: "var(--danger)",
            }}
            type="primary"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            style={{
              backgroundColor: "var(--blue)",
              borderColor: "var(--blue)",
            }}
          >
            Xác nhận hủy
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
export default CancelForm;
