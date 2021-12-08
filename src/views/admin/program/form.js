import programProvider from "@data-access/program";
import subjectProvider from "@data-access/subject";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { Button, Col, Form, Input, Row, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SubSelect } from "../../../components/SubSelect";
import { Modal } from "./styled";

const ProgramForm = ({ eventBack, type, data }) => {
  const disableInput = type === "detail";
  const [form] = Form.useForm();
  const [state, setState] = useState({
    defaultModal: true,
    data: data || {
      name: "",
    },
  });
  const [subjects, setSubjects] = useState([]);
  const [selects, setSelects] = useState((data && data.listSubjects) || []);

  const changeTimeStudy = (e) => {
    if (!e) return;
    const { startDate, endDate } = e;
    setState({
      ...state,
      data: {
        ...state.data,
        ngayKhaiGiang: startDate && startDate.format("yyyy-MM-DD"),
        ngayKetThuc: endDate && endDate.format("yyyy-MM-DD"),
      },
    });
  };

  const create = (body) => {
    programProvider.create(body).then((json) => {
      if (json && json.code === 200 && json.data) {
        eventBack();
        toast.success("Tạo mới thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };
  const update = (body) => {
    programProvider.update(body, data.id).then((json) => {
      if (json && json.code === 200 && json.data) {
        eventBack();
        toast.success("Cập nhật thành công");
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  useEffect(() => {
    subjectProvider.search({ page: 0, size: 1000 }).then((json) => {
      if (json && json.code === 200) {
        setSubjects(json.data);
      }
    });
    if (type === "update")
      programProvider.detail(data.id).then((json) => {
        if (json && json.code === 200) {
          setState({ ...state, data: json.data });
          setSelects(json.data.listSubjects || []);
        }
      });
  }, []);

  const handleDelete = (index) => {
    let newSelects = Object.assign([], selects);
    newSelects.splice(index, 1);
    setSelects(newSelects);
  };

  const onFinish = (values) => {
    const body = {
      ...values,
      subjectIds: JSON.stringify(
        selects.map((item) => {
          return item.id;
        })
      ),
    };
    if (type === "create") {
      create(body);
    } else {
      update(body);
    }
  };

  const columns = [
    {
      dataIndex: "stt",
      key: "stt",
      title: "STT",
      width: 70,
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "code",
      key: "code",
      title: "Mã môn",
      width: 100,
    },
    {
      dataIndex: "name",
      key: "name",
      title: "Tên môn",
    },
    {
      width: 50,
      dataIndex: "tienIch",
      key: "tienIch",
      render: (_, data) => {
        if (!disableInput)
          return (
            <Tooltip title="Xóa">
              <DeleteForeverOutlinedIcon
                className="pointer"
                onClick={() => handleDelete(data.stt - 1)}
                color="error"
              />
            </Tooltip>
          );
      },
    },
  ];

  return (
    <Modal
      className="modal-lg"
      size="sm"
      onCancel={eventBack}
      visible={true}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <div className="head text-muted text-center mt-2 mb-3">
          {type === "detail" ? (
            <big>Chi tiết chương trình đào tạo</big>
          ) : type === "create" ? (
            <big>Thêm mới chương trình đào tạo</big>
          ) : (
            <big>Chỉnh sửa chương trình đào tạo</big>
          )}
        </div>
        <Row>
          <Col span="12" className="pr-2">
            <Form.Item
              label="Mã chương trình"
              name="code"
              initialValue={state.data.code}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã chương trình",
                },
              ]}
            >
              <Input
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập mã chương trình"
              ></Input>
            </Form.Item>
          </Col>
          <Col span="12" className="pl-2">
            <Form.Item
              label="Tên chương trình"
              name="name"
              initialValue={state.data.name}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên chương trình",
                },
              ]}
            >
              <Input
                disabled={disableInput}
                autoComplete="off"
                placeholder="Nhập tên chương trình"
              ></Input>
            </Form.Item>
          </Col>
        </Row>

        <label>Chọn các môn trong chương trình</label>
        <SubSelect
          disable={disableInput}
          className="w100 mb-4"
          placeholder="Tìm kiếm"
          list={subjects.map((item, index) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          select={selects.map((item, index) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          onChange={(selectId) => {
            let itemSelect = subjects.find((item) => item.id === selectId);
            if (selects.findIndex((item) => item.id === selectId) === -1) {
              setSelects([...selects, itemSelect]);
            } else {
              toast.warn(
                "môn '" + itemSelect.name + "' đã tồn tại trong khóa học"
              );
            }
          }}
        ></SubSelect>
        <Table
          className="custom"
          scroll={{ x: 500, y: 400 }}
          columns={columns}
          dataSource={selects}
        ></Table>

        <div className="footer d-flex justify-end">
          <Button
            className="mr-2"
            danger
            type="primary"
            onClick={() => eventBack()}
          >
            Trở lại
          </Button>
          {type !== "detail" && (
            <Button htmlType="submit" type="primary" success>
              {type === "create" ? "Thêm mới" : "Chỉnh sửa"}
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );

  // return (
  //   <Modal className="modal-lg" size="sm" isOpen={true}>
  //     <div className="modal-body p-0">
  //       <Card className="bg-secondary shadow border-0">
  //         <CardHeader
  //           className="bg-transparent "
  //           style={{ display: "flex", justifyContent: "space-between" }}
  //         >
  //           <div className="text-muted text-center mt-2 mb-3">
  //             {isDetail ? (
  //               <big>Chi tiết chương trình đào tạo</big>
  //             ) : isCreate ? (
  //               <big>Thêm mới chương trình đào tạo</big>
  //             ) : (
  //               <big>Chỉnh sửa chương trình đào tạo</big>
  //             )}
  //           </div>
  //           <RollbackOutlined onClick={() => eventBack()} />
  //         </CardHeader>
  //         <CardBody className="px-lg-5 py-lg-5">
  //           <Form role="form">
  //             <Row>
  //               <Col lg="12">
  //                 <FormGroup>
  //                   <label className="form-control-label">
  //                     Mã chương trình
  //                   </label>
  //                   <Input
  //                     value={state.data.code}
  //                     name="code"
  //                     type="text"
  //                     disabled={isDetail}
  //                     onChange={(e) => change(e)}
  //                     invalid={validation.code && validation.code.isInvalid}
  //                   />
  //                   <FormFeedback>
  //                     {validation.code && validation.code.message}
  //                   </FormFeedback>
  //                 </FormGroup>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col lg="12">
  //                 <FormGroup>
  //                   <label className="form-control-label">
  //                     Tên chương trình
  //                   </label>
  //                   <Input
  //                     value={state.data.name}
  //                     name="name"
  //                     type="text"
  //                     disabled={isDetail}
  //                     onChange={(e) => change(e)}
  //                     invalid={validation.name && validation.name.isInvalid}
  //                   />
  //                   <FormFeedback>
  //                     {validation.name && validation.name.message}
  //                   </FormFeedback>
  //                 </FormGroup>
  //               </Col>
  //             </Row>
  //             <FormGroup>
  //               <label className="form-control-label" htmlFor="input-username">
  //                 Danh sách môn học:
  //               </label>
  //               <Form>
  //                 <Select
  //                   // className="form-control"
  //                   defaultValue="1"
  //                   placeholder="Tìm kiếm"
  //                   options={
  //                     subjects &&
  //                     subjects.map((item) => {
  //                       return {
  //                         label: item.name,
  //                         value: item.id,
  //                         ...item,
  //                       };
  //                     })
  //                   }
  //                   isDisabled={isDetail}
  //                   onChange={(item) => {
  //                     let add = true;
  //                     for (let id of subjectIds) {
  //                       if (id === item.id) {
  //                         add = false;
  //                         toast.warn(
  //                           "môn '" + item.name + "' đã tồn tại trong khóa học"
  //                         );
  //                         break;
  //                       }
  //                     }
  //                     if (add) {
  //                       const newSubjectIds = [item.id, ...subjectIds];
  //                       setSubjectIds(newSubjectIds);
  //                       setSelects([item, ...selects]);
  //                       change("subjectIds", JSON.stringify(newSubjectIds));
  //                     }
  //                   }}
  //                 />
  //               </Form>
  //             </FormGroup>
  //             <FormGroup>
  //               <div style={{ height: "400px", overflowY: "scroll" }}>
  //                 <Table className="align-items-center table-flush" responsive>
  //                   <thead className="thead-light">
  //                     <tr>
  //                       <th scope="col">STT</th>
  //                       <th scope="col">Mã môn</th>
  //                       <th scope="col">Tên môn</th>
  //                       <th scope="col" />
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {selects.map((item, index) => (
  //                       <tr key={index}>
  //                         <td>{index + 1}</td>
  //                         <td>{item.code}</td>
  //                         <td>{item.name}</td>
  //                         <td>
  //                           {!isDetail && (
  //                             <Tooltip placement="top" tooltip="Xóa">
  //                               <DeleteOutlined
  //                                 className="text-red i"
  //                                 onClick={() => handleDelete(index)}
  //                               />
  //                             </Tooltip>
  //                           )}
  //                         </td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </Table>
  //               </div>
  //             </FormGroup>
  //             <div className="text-center">
  //               <Button
  //                 className="my-12"
  //                 color="primary"
  //                 type="button"
  //                 onClick={() => eventBack()}
  //               >
  //                 Trở lại
  //               </Button>
  //               {!isDetail &&
  //                 (isCreate ? (
  //                   <Button
  //                     className="my-12"
  //                     color="primary"
  //                     type="button"
  //                     onClick={() => create()}
  //                   >
  //                     Thêm
  //                   </Button>
  //                 ) : (
  //                   <Button
  //                     className="my-12"
  //                     color="primary"
  //                     type="button"
  //                     onClick={() => update(state.data)}
  //                   >
  //                     Sửa
  //                   </Button>
  //                 ))}
  //             </div>
  //           </Form>
  //         </CardBody>
  //       </Card>
  //     </div>
  //   </Modal>
  // );
};
export default ProgramForm;
