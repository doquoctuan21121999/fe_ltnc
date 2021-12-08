import React, { useState } from "react";
import { toast } from "react-toastify";
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
import resultProvider from "@data-access/result";

const EnterPointForm = (props) => {
  const { eventBack, data, course } = props;
  const [state, setState] = useState({
    defaultModal: true,
    data: data || {},
  });

  const change = (e, value) => {
    if (typeof e === "string") {
      setState({ ...state, data: { ...state.data, [e]: value } });
    } else
      setState({
        ...state,
        data: { ...state.data, [e.target.name]: e.target.value },
      });
  };

  const submit = () => {
    resultProvider.enterPoint(data.resultId, state.data).then((json) => {
      if (json && json.code === 200) {
        toast.success("Nhập điểm thành công");
        eventBack();
      } else {
        toast.error("Xác nhận không thành công \n" + json.message);
      }
    });
  };

  return (
    <Modal
      className="modal-lg"
      size="sm"
      isOpen={true}
      toggle={() => eventBack()}
    >
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-3">
              <big>Nhập điểm</big>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <Row>
                <Col lg="7">
                  <FormGroup className="mb-3">
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên sinh viên
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state.data.name}
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Khóa
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={course}
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Điểm danh
                          </label>
                          <Row>
                            <Col>
                              <Input
                                className="form-control-alternative"
                                value={state.data.muster}
                                name="muster"
                                type="number"
                                onChange={(e) => change(e)}
                              />
                            </Col>
                            <Col>
                              <span style={{ fontSize: "20px" }}>/ 12</span>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Điểm giữa kì
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state.data.midPoint}
                            name="midPoint"
                            type="text"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Điểm cuối kỳ
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state.data.endPoint}
                            name="endPoint"
                            type="text"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tổng kết
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={state.data.total && state.data.total.toFixed(2)}
                            name="total"
                            type="text"
                            onChange={(e) => change(e)}
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
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
                {
                  <Button
                    className="my-12"
                    color="primary"
                    type="button"
                    onClick={() => submit()}
                  >
                    Cập nhật
                  </Button>
                }
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
export default EnterPointForm;
