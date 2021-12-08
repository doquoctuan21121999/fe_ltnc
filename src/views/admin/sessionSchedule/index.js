// core components
import Pagination from "@components/Pagination";
import { Content } from "@containers/Content";
import sessionScheduleProvider from "@data-access/session-schedule";
import { Button, Col, Form, Row, TimePicker } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// reactstrap components
import TableSession from "./Table";

const SessionSchedule = () => {
  const [state, setState] = useState({});

  const [form] = Form.useForm();
  const { getFieldValue } = form;

  const changePage = (value) => {
    setState({ ...state, page: value });
  };

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const handleDelete = (id, index) => {
    sessionScheduleProvider.delete(id).then((res) => {
      if (res && res.code === 200) {
        loadPage();
        toast.success("Xóa thành công");
      } else {
        toast.error("Xóa thất bại: " + res.message);
      }
    });
  };

  const loadPage = () => {
    sessionScheduleProvider.search({}).then((res) => {
      if (res && res.code && res.data) {
        setState({ ...state, dataRender: res.data, id: null });
        form.setFields([
          { name: "startTime", value: null },
          { name: "endTime", value: null },
        ]);
      }
    });
  };

  const onFinish = (values) => {
    console.log(values, form, form.getFieldValue("startTime"));
    if (!state.id) {
      sessionScheduleProvider
        .create({
          startTime: values.startTime.format("HH:mm:ss"),
          endTime: values.endTime.format("HH:mm:ss"),
        })
        .then((res) => {
          if (res && res.code === 200 && res.data) {
            loadPage();
            toast.success("Tạo mới thành công");
          } else {
            toast.error("Tạo mới thất bại: " + res.message);
          }
        });
    } else {
      sessionScheduleProvider
        .update(
          {
            startTime: values.startTime.format("HH:mm:ss"),
            endTime: values.endTime.format("HH:mm:ss"),
          },
          state.id
        )
        .then((res) => {
          if (res && res.code === 200 && res.data) {
            loadPage();
            toast.success("Cập nhật thành công");
          } else {
            toast.error("Cập nhật thất bại: " + res.message);
          }
        });
    }
  };

  return (
    <Content>
      <Row>
        <Col span={16} className="pr-3">
          <div className="content">
            <div className="head-content">
              <h3 className="mb-0">Danh sách các kíp</h3>
            </div>
            <TableSession
              dataSource={state.dataRender}
              handleDelete={handleDelete}
              handleUpdate={(id, data, index) => {
                setState({ ...state, id, index });
                form.setFields([
                  { name: "startTime", value: moment(data.startTime, "hh:mm") },
                  { name: "endTime", value: moment(data.endTime, "hh:mm") },
                ]);
              }}
            />
            <Pagination
              page={state.page}
              totalPage={state.totalPage}
              changePage={changePage}
            ></Pagination>
          </div>
        </Col>
        <Col span={8}>
          <div className="content p-4">
            <div className="head-content">
              <h3 className="mb-0">{state.id ? "Cập nhật" : "Tạo mới"}</h3>
            </div>
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Thời gian bắt đầu"
                name="startTime"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian bắt đầu",
                  },
                ]}
              >
                <TimePicker placeholder="Chọn giờ" format={"HH:mm"} />
              </Form.Item>
              <Form.Item
                label="Thời gian kết thúc"
                name="endTime"
                required
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian kết thúc",
                  },
                  {
                    validator(rule, value, callback) {
                      if (value && value < getFieldValue("startTime")) {
                        callback("Thời gian kết thúc trước thời gian bắt đầu!");
                      } else callback();
                    },
                  },
                ]}
              >
                <TimePicker placeholder="Chọn giờ" format={"HH:mm"} />
              </Form.Item>
              <div className="text-center">
                <Button htmlType="submit" type="primary">
                  {state.id ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Content>
  );
};

export default SessionSchedule;
