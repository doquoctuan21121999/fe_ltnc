import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
// core components
import UserHeader from "@components/Headers/ProfileHeader.js";
import uploadProvider from "@data-access/upload";
import {
  default as user,
  default as userProvider,
} from "@data-access/user";
import api from "@utils/api";
import { defaultState, getRole } from "@utils/common";
import gender from "@utils/const";
import "./style.scss";

const Profile = (props) => {
  const [state, setState] = useState({ ...defaultState, isEdit: true });
  const [nameUser, setNameUser] = useState();

  useEffect(() => {
    userProvider.profile().then((json) => {
      setState({
        ...state,
        isEdit: true,
      });
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          ...json.data,
        });
        setNameUser(json.data.fullName);
      }
    });
  }, []);

  const handleSubmitFile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);

    uploadProvider.uploadAvatar(formData, state.id).then((json) => {
      if (json.code === 200) {
        setState({ ...state, avatar: event.target.files[0].name });
        toast.success("cập nhật thành công");
      } else {
        toast.error(json.message);
      }
    });
  };
  const update = (e, body) => {
    changeEdit(e);
    setNameUser(body.fullName);
    body.createdAt = undefined;
    body.createdBy = undefined;
    body.updatedAt = undefined;
    body.updatedBy = undefined;
    body.healthFacility = undefined;
    body.listSchedules = undefined;
    body.listSubject = undefined;

    user.update(body.id, body).then((json) => {
      if (json && json.code === 200 && json.data) {
        // eventBack();
        toast.success("Thay đổi thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error("Thay đổi thất bại: "+ json.message);
      }
    });
  };
  const changeEdit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      isEdit: !state.isEdit,
    });
  };
  const change = (e, value) => {
    console.log(e);
    if (e.value === "NAM" || e.value === "NU") {
      setState({
        ...state,
        gender: e.value,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  };

  // console.log(state);
  return (
    <>
      <UserHeader isEdit={state.isEdit} evenBack={changeEdit} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {/* <input
                      className="i_f"
                      name="file"
                      id="file"
                      type="file"
                      defaultValue=""
                      accept="image/*"
                      onChange={(event) => handleSubmitFile(event)}
                    ></input> */}
                    <label htmlFor="file">
                      <img
                        // htmlFor="file"
                        // alt="..."
                        className="rounded-circle"
                        src={
                          api.image + state.avatar
                          // require("@assets/img/theme/team-4-800x800.jpg")
                          //   .default
                        }
                      />
                    </label>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {/* <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Nhắn tin
                  </Button>
                </div> */}
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Khóa</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Hoàn thành</span>
                      </div>
                      {/* <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {getRole(state.role)}
                    <span className="font-weight-light"></span>
                  </h3>
                  {/* <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Bucharest, Romania
                  </div>
                  <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div>
                  <hr className="my-4" />
                  <p>
                    Ryan — the name taken by Melbourne-raised, Brooklyn-based
                    Nick Murphy — writes, performs and records all of his own
                    music.
                  </p>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{nameUser}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {!state.isEdit ? (
                      <Button
                        color="primary"
                        href="#pablo"
                        disabled={state.isEdit}
                        // onClick={(e) => changeEdit(e)}
                        size="sm"
                        onClick={(e) => update(e, state)}
                      >
                        Lưu
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        href="#pablo"
                        disabled={!state.isEdit}
                        onClick={(e) => changeEdit(e)}
                        size="sm"
                      >
                        Chỉnh sửa
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin cá nhân
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-fullname"
                          >
                            Họ tên
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue="Ngô Quang Hiếu"
                            value={state.fullName}
                            disabled={state.isEdit}
                            id="input-fullname"
                            type="text"
                            name="fullName"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="ngoquanghieu@example.com"
                            value={state.email}
                            disabled={state.isEdit}
                            type="email"
                            name="email"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Tuổi
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            value={state.age}
                            disabled={state.isEdit}
                            id="input-age"
                            placeholder=""
                            type="number"
                            name="age"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-gender"
                          >
                            Giới tính
                          </label>
                          {/* <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-gender"
                            placeholder=""
                            disabled={state.isEdit}
                            type="text"
                            value={state.gender}
                            name="gender"
                            onChange={ (e)=> change(e) }
                          /> */}
                          <Select
                            value={state.gender}
                            placeholder={state.gender}
                            options={gender.genderOption}
                            id="input-gender"
                            isDisabled={state.isEdit}
                            name="gender"
                            onChange={(e) => change(e)}
                          ></Select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-birth"
                          >
                            Ngày sinh
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue=""
                            value={state.birth}
                            id="input-birth"
                            placeholder=""
                            disabled={state.isEdit}
                            type="date"
                            name="birth"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Địa chỉ
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-address"
                            placeholder=""
                            type="text"
                            value={state.address}
                            disabled={state.isEdit}
                            name="address"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone"
                          >
                            SĐT
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            value={state.phoneNumber}
                            id="input-phone"
                            placeholder=""
                            type="text"
                            disabled={state.isEdit}
                            name="phoneNumber"
                            onChange={(e) => change(e)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Thông tin đăng nhập
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Tên đăng nhập
                          </label>
                          <Input
                            className="form-control-alternative"
                            // defaultValue=""
                            value={state.username}
                            id="input-username"
                            placeholder=""
                            type="text"
                            disabled={state.isEdit}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-password"
                            placeholder=""
                            type="text"
                            value="********"
                            disabled={state.isEdit}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Giới thiệu</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Giới thiệu</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="thông tin giới thiệu bản thân ..."
                        rows="4"
                        defaultValue={state.aboutMe}
                        disabled={state.isEdit}
                        name="aboutMe"
                        type="textarea"
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default connect((state) => {
  return {
    currentUser: state.auth.currentUser,
  };
})(Profile);
