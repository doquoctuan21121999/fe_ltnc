// core components
import InputSearch from "@components/InputSearch";
import courseProvider from "@data-access/course";
import registerProvider from "@data-access/register-course";
import { Badge, Button, Card, Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalRegister from "./modal";

const RegisterCourse = ({ currentUser }) => {
  const [courses, setCourse] = useState([]);
  const [register, setRegister] = useState([]);
  const [params, setParams] = useState({});

  useEffect(() => {
    getData();
  }, [params]);

  const getData = () => {
    Promise.all([
      courseProvider.search({ page: 0, size: 999999, status: 1, ...params }),
      registerProvider.search({
        size: 999,
        studentId: currentUser.userId,
      }),
    ])
      .then((res) => {
        if (res && res.length > 1) {
          const listCourse = res[0]?.data;
          listCourse.forEach((item, index) => {
            if (res[1].data.some((element) => item.id === element.courseId)) {
              listCourse[index] = { ...item, hasRegister: true };
            }
          });
          setCourse(listCourse);
          setRegister(res[1].data);
        }
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between">
        <div className="w25 pl-3">
          <InputSearch
            search={(value) => setParams({ ...params, programName: value })}
          />
        </div>
        <Link to="/student/has-register">
          <Button
            className="btn-sm"
            type="primary"
            // onClick={() => (window.location.href = "/student/has-register")}
          >
            Danh sách đăng ký
          </Button>
        </Link>
      </div>
      <Row>
        {courses.map((item, index) => {
          return (
            <Col span={6} key={index} className="p-3">
              <Badge.Ribbon
                text={item.hasRegister ? "Đã đăng ký" : "Đăng ký ngay"}
                color={item.hasRegister ? "green" : "blue"}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      src={
                        require("@assets/images/bgCourse" +
                          ((index % 5) + 1) +
                          ".jpg").default
                      }
                    />
                  }
                  onClick={() =>
                    setParams({ ...params, showModal: true, dataDetail: item })
                  }
                >
                  <p>
                    <b>{item.programInfo?.name}</b>
                  </p>
                  <div>
                    Đợt : <b>{item.semester}</b>
                  </div>
                  <div>
                    hạn đăng ký :
                    <b>{moment(item.ngayKhaiGiang).format(" DD/MM/YYYY")}</b>
                  </div>
                  <div>
                    còn :{" "}
                    <b>{moment(item.ngayKhaiGiang).toDate().dateFromNow()}</b>
                  </div>
                  {/* <div>{item.programInfo?.name}</div> */}
                </Card>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
      {params.showModal && (
        <ModalRegister
          eventBack={() => setParams({ ...params, showModal: false })}
          data={params.dataDetail}
        />
      )}
    </div>
  );
};

export default connect((state) => {
  return { currentUser: state.auth.currentUser };
})(RegisterCourse);
