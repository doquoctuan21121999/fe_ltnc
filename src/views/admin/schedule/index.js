// core components
import { Content } from "@containers/Content";
import courseProvider from "@data-access/course";
import scheduleProvider from "@data-access/schedule";
import { defaultState } from "@utils/common";
import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// reactstrap components
import { Button } from "reactstrap";
import CancelForm from "./CancelForm";
import ChangeScheduleForm from "./ChangeScheduleForm";
import ScheduleForm from "./form";
import TableCourse from "./TableCourse";
import TableSchedule from "./TableSchedule";
import TableSubject from "./TableSubject";

const Schedule = () => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState({
    ...defaultState,
    loading: false,
    showSelect: false,
    id: undefined,
  });
  const [courseDetail, setCourseDetail] = useState([]);
  const [listSubjects, setListSubjects] = useState([]);

  const timeout = useRef(null);

  useEffect(() => {
    loadPage();
  }, [state.param, state.reload]);

  const showModal = (data, type) => {
    let showCancel = type === "edit" && data.reason ? true : false;
    let showChangeSchedule = type === "edit" && data.changeInfo ? true : false;
    let isCreate = type === "create";
    let isDetail = type === "detail";
    let showUpdate = type === "update" || isDetail || isCreate;
    let reload = type === "back" ? !state.reload : state.reload;

    setState({
      ...state,
      showUpdate: showUpdate,
      dataDetail: data,
      isCreate,
      isDetail,
      showChangeSchedule,
      showCancel,
      reload,
    });
  };

  const changeSelectModal = (type) => {
    let reload = type === "back" ? !state.reload : state.reload;
    setState({
      ...state,
      showSelect: !state.showSelect,
      reload,
    });
  };

  const search = (e) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setState({ ...state, id: e.target.value, loading: true });
      clearTimeout(timeout);
    }, 500);
  };

  const handleDelete = (id) => {
    scheduleProvider.delete(id).then((json) => {
      if (json && json.code === 200) {
        toast.success("Xóa thành công");
        loadPage();
        showModal();
      } else if (json && json.code === 401) {
        window.location.href = "/login";
      } else {
        setState({ ...state, loading: false });
        toast.error(json.message);
      }
    });
  };

  const loadPage = () => {
    state.id
      ? courseProvider.getById(state.id).then((json) => {
          if (json && json.code === 200) {
            setCourseDetail(json.data);
            setListSubjects(handleSubject(json.data));
          }
        })
      : scheduleProvider.findAllChange().then((json) => {
          if (json && json.code === 200 && json.data)
            setCourseDetail({ listSchedules: json.data });
        });
  };

  const handleSubject = (data) => {
    const { programInfo, listSchedules } = data;

    console.log(data);
    return programInfo.listSubjects.map((item) => {
      const hasScheduled = listSchedules?.some(
        (element) => element.subjectId === item.id
      );

      return {
        ...item,
        hasScheduled,
      };
    });
  };

  return (
    <>
      <Row>
        <Col span={12} className="pr-3">
          <Content>
            <div className="content">
              <TableCourse
                selectEvent={(item, activeIndex, tabActive) => {
                  console.log();
                  setState({
                    ...state,
                    tabActive,
                    id: item.id,
                    name: item?.programInfo?.name,
                    showSelect: false,
                    activeIndex,
                    reload: !state.reload,
                  });
                }}
                activeIndex={state.activeIndex}
                tabActive={state.tabActive}
              />
            </div>
          </Content>
        </Col>
        <Col span={12}>
          <Content>
            <div className="content">
              <div className="head-content">
                <h3 className="mb-0">
                  Danh sách các môn - <b>{state.name || ""}</b>
                </h3>
              </div>
              <div style={{ paddingTop: "17px" }}>
                <TableSubject dataSource={listSubjects} />
              </div>
            </div>
          </Content>
        </Col>
      </Row>

      <Content>
        <div className="content">
          <div className="head-content">
            <h3>
              {state.id
                ? "Thời khóa biểu - " + (state.name || "")
                : "Các môn yêu cầu đổi lịch "}
            </h3>
            <Button
              className="my-12 button-create"
              disabled={!state.id}
              color="success"
              type="button"
              onClick={() => showModal(null, "create")}
            >
              Thêm mới
            </Button>
          </div>
          <TableSchedule
            dataSource={courseDetail.listSchedules}
            handleDelete={handleDelete}
            showModal={showModal}
          />
        </div>
      </Content>

      {state.showUpdate && (
        <ScheduleForm
          isCreate={state.isCreate}
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          dataRender={courseDetail}
          index={state.indexDetail}
          listSubject={
            courseDetail &&
            courseDetail.programInfo &&
            courseDetail.programInfo.listSubjects
          }
          listSchedule={courseDetail.listSchedules}
          courseId={state.id}
        />
      )}
      {state.showCancel && (
        <CancelForm
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          action={() => handleDelete(state.dataDetail.id)}
        />
      )}
      {state.showChangeSchedule && (
        <ChangeScheduleForm
          isCreate={state.isCreate}
          eventBack={() => showModal(null, "back")}
          data={state.dataDetail}
          dataRender={courseDetail}
          index={state.indexDetail}
          listSubject={
            courseDetail &&
            courseDetail.programInfo &&
            courseDetail.programInfo.listSubjects
          }
          courseId={state.id}
          // eventBack={() => showModal(null, "back")}
          // data={{ value: state.id, label: state.name }}
        />
      )}
    </>
  );
};

export default Schedule;
