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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import changePassword from "./../../../data-access/change-password";

const ChangePass = () => {
  const [state, setState] = useState({
    password: "",
    newPassword: "",
    checkPassword: "",
  });
  const [isRedirect, setIsRedirect] = useState(false);
  console.log(window.location);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (state.newPassword != state.checkPassword) {
      toast.error("Check lại mật khẩu");
      return;
    } else {
      const body = {
        password: state.password,
        passwordChange: state.newPassword,
      };
      changePassword.changePass(body).then((json) => {
        console.log(json);
        //   if(json.code === 200){

        //     toast.success('Đổi mật khẩu thành công');
        //     // setIsRedirect(true);
        //   }
        //    else if(json.code === 401){
        //   // window.location.href = "/login";
        //   }
        //     else{
        //     toast.error(json.message);
        // }
      });
    }
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up with</small>
            </div>
            <div className="text-center">
              <Button
                className="btn-neutral btn-icon mr-4"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("@assets/img/icons/common/github.svg").default}
                  />
                </span>
                <span className="btn-inner--text">Github</span>
              </Button>
              <Button
                className="btn-neutral btn-icon"
                color="default"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <span className="btn-inner--icon">
                  <img
                    alt="..."
                    src={require("@assets/img/icons/common/google.svg").default}
                  />
                </span>
                <span className="btn-inner--text">Google</span>
              </Button>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu cũ"
                    type="password"
                    name="password"
                    onChange={(e) => handleChange(e)}
                    // autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mật khẩu mới"
                    type="password"
                    name="newPassword"
                    onChange={(e) => handleChange(e)}
                    // autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nhập lại Mật khẩu mới"
                    type="password"
                    name="checkPassword"
                    onChange={(e) => handleChange(e)}
                    // autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* {isRedirect && <Redirect from="*" to="/admin/index" />} */}
      </Col>
    </>
  );
};

export default ChangePass;
