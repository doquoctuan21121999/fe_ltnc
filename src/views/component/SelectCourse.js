// core components
import { Content } from "@containers/Content";
import { Col, Row, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
const SelectCourse = ({
  handleSelectCourse,
  dataSource = [],
  search = () => {},
  defaultSelectId,
  detail,
  scroll = { x: "auto", y: 200 },
}) => {
  const [state, setState] = useState({
    params: {
      page: 0,
      size: 10,
      status: 3,
    },
    detail,
    selectId: defaultSelectId,
  });
  useEffect(() => {
    setState({ ...state, detail, selectId: defaultSelectId });
  }, [detail]);
  const changePage = (value) => {
    setState({ params: { ...state.params, page: value } });
  };

  const columns = [
    {
      title: (
        <div className="custom-header">
          <div className="title-box">STT</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "stt",
      key: "stt",
      width: "6%",
      render: (_, __, index) => {
        return index + 1 + state.params.size * state.params.page;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Mã khóa</div>
          <div className="addition-box">
            <div className="search-box">
              {/* <img src={require("@images/icon/ic-search.png")} alt="" /> */}
              <input name="address" onChange={search} placeholder="Tìm kiếm" />
            </div>
          </div>
        </div>
      ),
      dataIndex: "programInfo",
      key: "code",
      width: "10%",
      render: (item) => {
        return item.code;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Tên khóa</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "programInfo",
      key: "name",
      width: "30%",
      render: (item) => {
        return item.name;
      },
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Đợt</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "semester",
      key: "semester",
      width: "10%",
    },
    {
      title: (
        <div className="custom-header">
          <div className="title-box">Số lượng</div>
          <div className="addition-box"></div>
        </div>
      ),
      dataIndex: "numberRegister",
      key: "numberRegister",
      width: "10%",
    },
  ];

  const handleSelect = (selectId, detail, selectIndex) => {
    if (handleSelectCourse) {
      handleSelectCourse(selectId, detail, selectIndex);
    }
    setState({ ...state, selectId });
  };

  console.log(state);
  return (
    <Row>
      <Col span="12">
        <Content>
          <div className="content">
            <div className="head-content d-flex justify-space-between">
              <div className="a">
                <h3>Khóa học</h3>
              </div>
            </div>
            <Table
              className="custom-table pb-3"
              dataSource={dataSource}
              rowClassName={(record) => {
                console.log(record.id, state.selectId);
                return record.id === state.selectId
                  ? "active pointer"
                  : "pointer";
              }}
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    handleSelect(record.id, record, index);
                  },
                };
              }}
              scroll={scroll}
              rowKey={(r, idx) => idx}
              columns={columns}
              footer={null}
              pagination={false}
            ></Table>
          </div>
        </Content>
      </Col>
      <Col span="12">
        <Content>
          <div className="content">
            <div className="head-content d-flex justify-space-between pl-4">
              <div className="a">
                <h3>Thông tin khóa học</h3>
              </div>
            </div>
            <div className="pl-4">
              <Row>
                <Col span={12}>
                  <label>Tên chương trình đào tạo</label>
                  <p>
                    <b>{state.detail?.programInfo?.name}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Mã chương trình</label>
                  <p>
                    <b>{state.detail?.programInfo?.code}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Số tiết học</label>
                  <p>
                    <b>{state.detail?.programInfo?.lesson}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Học phí</label>
                  <p>
                    <b>{state.detail?.programInfo?.price}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Đợt</label>
                  <p>
                    <b>{state.detail?.programInfo?.numberTurn}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Cơ sở đào tạo</label>
                  <p>
                    <b>{state.detail?.healthFacility?.address}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Số lượng đăng ký</label>
                  <p>
                    <b>{state.detail?.numberRegister}</b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Số môn</label>
                  <p>
                    <b>{state.detail?.programInfo?.listSubjects?.length}</b>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <label>Ngày khai giảng</label>
                  <p>
                    <b>
                      {state.detail &&
                        moment(state.detail?.ngayKhaiGiang).format(
                          "DD/MM/YYYY"
                        )}
                    </b>
                  </p>
                </Col>
                <Col span={12}>
                  <label>Kết thúc học kỳ</label>
                  <p>
                    <b>
                      <b>
                        {state.detail &&
                          moment(state.detail?.ngayKetThuc).format(
                            "DD/MM/YYYY"
                          )}
                      </b>
                    </b>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Content>
      </Col>
    </Row>
  );
};

export default connect((state) => {
  return {};
})(SelectCourse);
