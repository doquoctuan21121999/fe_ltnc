import { Modal as MD } from "antd";
import styled from "styled-components";

export const Modal = styled(MD)`
  .head {
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  .footer {
    padding: 10px;
    background-color: white;
  }
`;

export const TabsBody = styled.div`
  .ant-tabs-tab {
    padding: 15px 10px !important;
  }
`;

export const Title = styled.div`
  background-color: white;
  .title {
    margin: 0 10px 10px 10px;
    padding: 10px;
    background-color: #eee;
    label {
      color: #aaa;
    }
    b {
      font-weight: 600;
    }
    .ant-col {
      padding: 5px;
    }
  }
`;
