import React, { useState } from "react";
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
  Table,
} from "reactstrap";
import Select from "react-select";
import constants from "../../../utils/const";
import { useEffect } from "react";
import subjectProvider from "../../../data-access/subject";
import userProvider from "../../../data-access/user";
import { toast } from "react-toastify";
import Tooltip from "../../../components/Tooltip";
import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";

const TeacherForm = (props) => {
  const { eventBack, isCreate, isDetail } = props;
  const data = props.data || { name: "", price: "" };
  const [state, setState] = useState({
    select: data.subjects,
    nameTeacher: data.fullName,
    role: data.role,
  });

  useEffect(() => {
    subjectProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.data && json.code === 200) {
        setState({
          ...state,
          subjects: json.data.filter(
            (item) =>
              !state.select.filter((selected) => selected.id === item.id)
                .length > 0
          ),
        });
      }
    });
  }, []);

  const addSubject = (selectId) => {
    if (state.select.filter((item) => item.id === selectId).length !== 0) {
      toast.info("môn học đã được chọn");
      return;
    }
    const itemSelect = state.subjects.filter((item) => item.id === selectId)[0];
    let newData = Object.assign([], state.select);
    newData = [itemSelect, ...newData];

    let indexRemove = state.subjects.findIndex(
      (item) => item.id === itemSelect.id
    );
    let newListSubjects = Object.assign([], state.subjects);
    newListSubjects.splice(indexRemove, 1);

    setState({ ...state, select: newData, subjects: newListSubjects });
  };

  const handleDelete = (index) => {
    let newData = Object.assign([], state.select);
    newData.splice(index, 1);

    setState({ ...state, select: newData });
  };

  const submit = () => {
    userProvider
      .approveTeacher(
        data.id,
        state.select.map((data) => data.id)
      )
      .then((json) => {
        if (json && json.code === 200) {
          toast.success(
            state.role === constants.roles.teacher.value
              ? "Chỉnh sửa môn giảng dạy thành công"
              : "Xác nhận quyền GIẢNG VIÊN cho tài khoản " +
                  state.nameTeacher +
                  " thành công"
          );
          eventBack();
        } else {
          toast.error("Xác nhận không thành công \n" + json.message);
        }
      });
  };

  return (
    <Modal className="modal-lg" size="sm" isOpen={true}>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader
            className="bg-transparent"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="text-muted text-center mt-2 mb-3">
              
              {isDetail ? (
                <big> Chi tiết môn giảng dạy </big>
              ) : (
                <big> Chọn môn giảng dạy </big>
              )}
            </div>
            <RollbackOutlined
              onClick={() => {
                eventBack();
              }}
            />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Giảng viên:
                </label>
                <Input
                  className="form-control-alternative"
                  value={state.nameTeacher}
                  autoComplete="off"
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="input-username">
                  Các môn giảng dạy
                </label>
                <Form>
                  <Select
                    // className="form-control"
                    defaultValue="1"
                    placeholder="Tìm kiếm"
                    options={
                      state.subjects &&
                      state.subjects.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                          ...item,
                        };
                      })
                    }
                    isDisabled={isDetail}
                    onChange={(item) => {
                      addSubject(item.value);
                    }}
                  />
                </Form>
              </FormGroup>
              <FormGroup>
                <div style={{ height: "400px", overflowY: "scroll" }}>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"> STT </th> <th scope="col"> Mã môn </th>
                        <th scope="col"> Tên môn </th> <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      
                      {state.select &&
                        state.select.map((item, index) => (
                          <tr key={index}>
                            <td> {index + 1} </td> <td> {item.code} </td>
                            <td> {item.name} </td>
                            <td>
                              
                              {!isDetail && (
                                <Tooltip placement="top" tooltip="Xóa">
                                  <DeleteOutlined
                                    className="text-red i"
                                    onClick={() => handleDelete(index)}
                                  />
                                </Tooltip>
                              )}
                            </td>
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
                {!isDetail && (
                  <Button
                    className="my-12"
                    color="success"
                    type="button"
                    onClick={() => submit()}
                  >
                    Thêm
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
export default TeacherForm;
