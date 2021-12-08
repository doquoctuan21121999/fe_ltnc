// core components
import Pagination from "@components/Pagination";
import { Content } from "@containers/Content";
import registerProvider from "@data-access/register-course";
import resultProvider from "@data-access/result";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PointTableStudent from "../../component/PointTableStudent";
import PointSelectCourse from "../../component/SelectCourse";

const Result = () => {
  const currentUser = useSelector((state) => state.auth.currentUser || {});
  const [state, setState] = useState({ courses: [] });
  const [courseName, setCourseName] = useState("");

  const changePage = (value) => {
    setState({ ...state, page: value });
  };

  useEffect(() => {
    getCourse();
  }, [state.param, state.reload]);

  const getData = (params, newState) => {
    resultProvider.getResult(params).then((json) => {
      if (json && json.code === 200 && json.data) {
        setState({
          ...state,
          ...newState,
          dataResults: json.data,
        });
      } else {
        toast.error("Lỗi: " + json.message);
      }
    });
  };

  const getCourse = () => {
    registerProvider
      .search({ size: 999999, studentId: currentUser.userId })
      .then((res) => {
        if (res && res.code === 200 && res.data) {
          if (res.data) {
            const detail =
              res.data.find(
                (item) =>
                  item.courseInfo?.status === 1 || item.courseInfo?.status === 2
              ) ||
              res.data[0] ||
              {};
            getData(
              { registerId: detail.id },
              {
                register: res.data,
                selectRegisterId: detail.courseInfo.id,
                detail: detail.courseInfo,
                courses: res.data.map((item) => {
                  return {
                    ...item.courseInfo,
                  };
                }),
              }
            );
          }
        } else {
          toast.error("Lỗi: " + res.message);
        }
      });
  };

  const detail = (obj) => {
    setState({ ...state, param: { ...state.param, registerId: obj.id } });
    setCourseName(obj.courseInfo.name);
  };
  console.log("state", state, state.courses);
  return (
    <div>
      <PointSelectCourse
        handleSelectCourse={(_, __, selectIndex) =>
          getData({ registerId: state.register[selectIndex].id })
        }
        dataSource={state.courses}
        defaultSelectId={state.selectRegisterId}
        detail={state.detail}
      />
      <Content>
        <div className="content">
          <div className="head-content">
            <h3 className="mb-0">Kết quả học tập - {courseName}</h3>
          </div>
          <PointTableStudent
            dataSource={state.dataResults}
            scroll={{ x: "auto", y: 500 }}
          />
        </div>
        <Pagination
          page={state.page}
          totalPage={state.totalPage}
          changePage={changePage}
        ></Pagination>
      </Content>
    </div>
  );
};

export default Result;
