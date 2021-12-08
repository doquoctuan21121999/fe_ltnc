import moment from "moment";
import React,{ useEffect,useState } from "react";
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
    Row
} from "reactstrap";
import placeProvider from "@data-access/place";
import scheduleProvider from "@data-access/schedule";


const CancelForm = (props) => {
  const { eventBack, data } = props;
  const [state, setState] = useState({
    defaultModal: true,
    data:
      {
        ...data,
        courseId: data && data.courseId,
        dates:
          (data &&
            data.dates &&
            JSON.parse(data.dates).map((item, key) => {
              return moment(item);
            })) ||
          [],
      } || {},
  });
  const [teachers, setTeachers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // getData();
    getPlaces();
  }, [state.reload, state.param]);

  const change = (e, value) => {
    setState({ ...state, data: { ...state.data, [e]: value } });
  };

  const getPlaces = () => {
    placeProvider.search({ page: 0, size: 999999 }).then((json) => {
      if (json && json.code === 200) {
        setPlaces(json.data);
      }
    });
  };

  const validate = () => {};

  const update = (body) => {
    if (validate(state.data)) return;
    // scheduleProvider.update(state.data, data.id).then((json) => {
    //   if (json && json.code === 200 && json.data) {
    //     eventBack();
    //     toast.success("tạo mới thành công");
    //   } else if (json && json.code === 401) {
    //     window.location.href = "/login";
    //   } else {
    //     setState({ ...state, loading: false });
    //     toast.error(json.message);
    //   }
    // });
  };
  return (
    <Modal className="modal-lg" size="sm" isOpen={true}>
      <div className="modal-body p-0">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent">
            <div className="text-muted text-center mt-2 mb-3">Hủy lịch</div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label className="form-control-label">Lý do</label>
                    <Input
                      placeholder="Nhập lý do"
                      value={state.data.reason}
                      onChange={(e) => change("reason",e.target.value)}
                    />
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
                <Button
                  className="my-12"
                  color="success"
                  type="button"
                  onClick={() => update(state.data)}
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};
export default CancelForm;
