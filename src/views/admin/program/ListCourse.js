// import { DatePicker } from "antd";
import { RangePicker } from "@components/DatePicker";
import courseProvider from "@data-access/course";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
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
  Label,
  Modal,
  Row,
  Table,
  Tooltip,
} from "reactstrap";
// import "antd/dist/antd.css";

const ListCourse = (props) => {
  const { eventBack, programId, programName } = props;
  const [state, setState] = useState([]);

  useEffect(() => {
    Promise.all([
      courseProvider
        .search({ page: 0, size: 10, programId: programId })
        .then((json) => {
          if (json && json.code === 200) {
            setState(json.data);
          }
        }),
    ]);
  }, []);

  return (
    <Modal className="modal-lg" size="sm" isOpen={true}>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-3">
              <big>Chi tiết các khóa học của chương trình</big>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <div style={{ height: "400px", overflowY: "scroll" }}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên khóa</th>
                        <th scope="col">Mã khóa</th>
                        <th scope="col">Ngày khai giảng</th>
                        <th scope="col">Ngày kết thúc</th>
                        <th scope="col">Số lượng tiết học</th>
                        <th scope="col">Số lượng đăng ký</th>
                        <th scope="col">Đã hoàn thành</th>
                        <th scope="col">Chưa hoàn thành</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.map((course, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{programName}</td>
                          <td>{course.code}</td>
                          <td>{course.ngayKhaiGiang}</td>
                          <td>{course.ngayKetThuc}</td>
                          <td>{course.numberLesson}</td>
                          <td
                            onClick={() =>
                              (window.location.href =
                                "/admin/results?courseId=" + course.id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {course.numberRegister ? course.numberRegister : 0}
                          </td>
                          <td>{course.totNghiep ? course.totNghiep : 0}</td>
                          <td>{course.truot ? course.truot : 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-12"
                  color="primary"
                  type="button"
                  onClick={() => eventBack()}
                >
                  Trở lại
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
export default connect((state) => state.program, null)(ListCourse);
