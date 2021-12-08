import courseProvider from "@data-access/course";
import registerCourseProvider from "@data-access/register-course";
import { Modal } from "@utils/styled";
// reactstrap components
import { Button, Col, Form, Row } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const ModalInfo = styled(Modal)`
  .ant-modal-body {
    padding: 0;
    .content {
      padding: 24px;
    }
  }
`;

const ModalRegister = ({
  eventBack = () => {},
  data = {},
  isRegister = false,
}) => {
  const [course, setCourse] = useState([]);
  const [healthFacility, setHealthFacility] = useState([]);
  const [form] = Form.useForm();

  const getCourse = (id) => {
    courseProvider
      .search({ page: 0, size: 999999, healthFacilityId: id, status: 1 })
      .then((json) => {
        if (json && json.code === 200 && json.data) {
          setCourse(
            json.data.map((item) => {
              return {
                value: item.id,
                label: item.programInfo ? item.programInfo.name : null,
              };
            })
          );
        }
      });
  };

  const onFinish = () => {
    registerCourseProvider.register({ courseId: data.id }).then((json) => {
      if (json.code === 200) {
        toast.success("Đăng ký thành công");
        eventBack();
      } else {
        toast.error(json.message);
      }
    });
  };

  return (
    <ModalInfo
      size="sm"
      onCancel={eventBack}
      visible={true}
      footer={null}
      style={{ padding: "0" }}
    >
      <div
        className="content"
        // style={{
        //   backgroundImage: `url(${bg})`,
        //   backgroundSize: "cover",
        //   position: "relative",
        // }}
      >
        <div className="">
          <div className="head text-white text-center mt-2 mb-3">
            <h3>Đăng ký khóa học</h3>
          </div>

          <Row>
            <Col span={12}>
              <label>Mã chương trình</label>
              <p>
                <b>{data.programInfo?.code}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Tên chương trình</label>
              <p>
                <b>{data.programInfo?.name}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Cơ sở</label>
              <p>
                <b>{data.healthFacility?.name}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Số tiết</label>
              <p>
                <b>{data.programInfo?.lesson}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Đợt</label>
              <p>
                <b>{data.semester}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Học phí</label>
              <p>
                <b>{data.programInfo?.price?.formatPrice()}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Số lượng đăng ký</label>
              <p>
                <b>{data.numberRegister + " / " + data.limitRegister}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Hạn đăng ký</label>
              <p>
                <b>{new Date(data.ngayKhaiGiang).dateFromNow()}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Ngày khai giảng</label>
              <p>
                <b>{moment(data.ngayKhaiGiang).format("DD/MM/YYYY")}</b>
              </p>
            </Col>
            <Col span={12}>
              <label>Ngày kết thúc học kỳ</label>
              <p>
                <b>{moment(data.ngayKetThuc).format("DD/MM/YYYY")}</b>
              </p>
            </Col>
          </Row>
        </div>

        <div className="text-center">
          <Button
            className="mr-2 bg-red"
            type="primary"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
          {!data.hasRegister && (
            <Button className="" type="primary" onClick={() => onFinish()}>
              Đăng ký
            </Button>
          )}
        </div>
      </div>
    </ModalInfo>
  );
};
export default ModalRegister;
